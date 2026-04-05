import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerClient } from '@/lib/supabase';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { allowed } = rateLimit(`hooks:${ip}`, { maxRequests: 10, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  try {
    const { niche, count = 10, userId } = await request.json();

    if (!niche || typeof niche !== 'string') {
      return NextResponse.json({ error: 'niche is required' }, { status: 400 });
    }

    const validCount = Math.min(Math.max(Number(count) || 10, 5), 20);
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim() ?? '';
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Hook generator is temporarily unavailable. AI service is not configured.' },
        { status: 503 }
      );
    }

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are a specialist in writing TikTok slide hooks.
Rules:
- Each hook must be under 12 words
- Emotional, specific, and relatable
- Framed around a pain point or relatable frustration
- Casual first-person voice (e.g. "I spent 3 months building...")
- No clickbait, no em dashes, no hashtags
- Return ONLY a valid JSON array of strings, no other text`,
      messages: [
        {
          role: 'user',
          content: `Generate ${validCount} TikTok slide hooks for the niche: "${niche}". Return a JSON array of strings only.`,
        },
      ],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text : '';

    let hooks: string[] = [];
    try {
      const match = raw.match(/\[[\s\S]*\]/);
      hooks = match ? JSON.parse(match[0]) : [];
    } catch {
      return NextResponse.json({ error: 'Failed to parse hooks from AI response' }, { status: 500 });
    }

    if (userId && hooks.length > 0) {
      try {
        const db = createServerClient();
        const rows = hooks.map((hook_text) => ({
          user_id: String(userId),
          niche,
          hook_text,
          is_used: false,
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (db as any).from('hooks').insert(rows);
      } catch (err) {
        console.error('Supabase insert failed (non-critical):', err);
      }
    }

    return NextResponse.json({ hooks });
  } catch (err) {
    if (err instanceof Anthropic.APIError && err.status === 401) {
      console.error('Anthropic authentication failed for hooks API:', err.message);
      return NextResponse.json(
        { error: 'Hook generator is temporarily unavailable. AI credentials need updating.' },
        { status: 503 }
      );
    }

    console.error('Generate hooks error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
