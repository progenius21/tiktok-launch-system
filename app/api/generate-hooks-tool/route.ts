import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { rateLimit } from '@/lib/rate-limit';

type HookCategory = 'curiosity' | 'controversy' | 'storytelling' | 'direct' | 'trend-jack';
type HookFormat = 'talking-head' | 'screen-record' | 'slideshow' | 'text-on-screen' | 'duet-stitch';

interface GeneratedHook {
  text: string;
  category: HookCategory;
  format: HookFormat;
}

function shortLabel(value: string, fallback: string) {
  const cleaned = value.replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.split(' ').slice(0, 3).join(' ') : fallback;
}

function buildFallbackHooks(appName: string, appNiche: string): GeneratedHook[] {
  const name = shortLabel(appName, 'your app');
  const niche = shortLabel(appNiche, 'your niche');

  return [
    { text: `POV: ${niche} gets easier in one tap`, category: 'curiosity', format: 'text-on-screen' },
    { text: `Nobody talks about this ${niche} shortcut`, category: 'curiosity', format: 'talking-head' },
    { text: `Wait for it: this app kills busywork`, category: 'curiosity', format: 'screen-record' },
    { text: `I found a faster way to do ${niche}`, category: 'curiosity', format: 'slideshow' },

    { text: `Most ${niche} advice wastes your time`, category: 'controversy', format: 'talking-head' },
    { text: `Stop doing ${niche} the hard way`, category: 'controversy', format: 'text-on-screen' },
    { text: `${niche} pros overcomplicate this on purpose`, category: 'controversy', format: 'duet-stitch' },
    { text: `Your ${niche} stack is probably too bloated`, category: 'controversy', format: 'screen-record' },

    { text: `Three weeks ago, ${name} saved my launch`, category: 'storytelling', format: 'talking-head' },
    { text: `I almost quit before this ${niche} fix`, category: 'storytelling', format: 'slideshow' },
    { text: `I was stuck until this workflow clicked`, category: 'storytelling', format: 'text-on-screen' },
    { text: `Mid-build, this changed everything for me`, category: 'storytelling', format: 'screen-record' },

    { text: `Get users faster with ${name}`, category: 'direct', format: 'screen-record' },
    { text: `Save hours instantly with this app`, category: 'direct', format: 'talking-head' },
    { text: `Fix ${niche} chaos in minutes`, category: 'direct', format: 'text-on-screen' },
    { text: `Launch smarter today with ${name}`, category: 'direct', format: 'slideshow' },

    { text: `POV: you finally automate the annoying part`, category: 'trend-jack', format: 'text-on-screen' },
    { text: `Watch me replace three tools with one`, category: 'trend-jack', format: 'screen-record' },
    { text: `If you know, this launch hack slaps`, category: 'trend-jack', format: 'duet-stitch' },
    { text: `This sound plus ${name} is unfair`, category: 'trend-jack', format: 'talking-head' },
  ];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { allowed } = rateLimit(`hooks-tool:${ip}`, { maxRequests: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  let appName = '';
  let appNiche = '';

  try {
    const body = await req.json();
    appName = typeof body.appName === 'string' ? body.appName : '';
    appNiche = typeof body.appNiche === 'string' ? body.appNiche : '';

    if (!appName || !appNiche) {
      return NextResponse.json({ error: 'App name and niche required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim() ?? '';
    if (!apiKey) {
      console.warn('Anthropic API key missing for hook generator, using fallback hooks.');
      return NextResponse.json({
        hooks: buildFallbackHooks(appName, appNiche),
        source: 'fallback',
      });
    }

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Generate 20 TikTok hooks for an app called "${appName}" in the "${appNiche}" niche.

These hooks are for short-form video content (TikTok/Reels/Shorts) designed to promote the app organically without feeling like ads.

Return ONLY valid JSON with no other text. The format must be:

{
  "hooks": [
    {
      "text": "The hook text",
      "category": "curiosity" | "controversy" | "storytelling" | "direct" | "trend-jack",
      "format": "talking-head" | "screen-record" | "slideshow" | "text-on-screen" | "duet-stitch"
    }
  ]
}

Rules for the hooks:
- Write in a conversational, casual tone. No corporate speak.
- Each hook must be under 15 words. Shorter is better.
- Mix the categories evenly (4 of each category).
- Make them feel native to TikTok. Reference trends, use patterns like "POV:", "Wait for it", "Nobody talks about this but", "I found an app that", "Stop scrolling if you".
- Controversy hooks should be bold but not offensive. Challenge assumptions about the niche.
- Storytelling hooks should start mid-story to create curiosity.
- Direct hooks should state a clear benefit in the first 3 words.
- Trend-jack hooks should reference common TikTok formats and sounds.
- Do not mention the app name in every hook. Use it in max 5 of the 20.
- Each hook must make someone stop scrolling within 1 second.

Return ONLY the JSON object. No markdown, no backticks, no explanation.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No response generated' }, { status: 500 });
    }

    let parsed;
    try {
      const cleaned = textBlock.text.replace(/```json\n?|```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error('Failed to parse Claude response:', textBlock.text);
      return NextResponse.json({ error: 'Failed to parse hooks' }, { status: 500 });
    }

    return NextResponse.json({
      ...parsed,
      source: 'anthropic',
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError && err.status === 401) {
      console.error('Anthropic authentication failed for hook generator:', err.message);
      return NextResponse.json({
        hooks: buildFallbackHooks(appName, appNiche),
        source: 'fallback',
      });
    }

    console.error('Generate hooks tool error:', err);
    return NextResponse.json({
      hooks: buildFallbackHooks(appName, appNiche),
      source: 'fallback',
    });
  }
}
