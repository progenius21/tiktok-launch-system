import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { allowed } = rateLimit(`lead:${ip}`, { maxRequests: 5, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const FROM = process.env.RESEND_FROM_EMAIL || 'TikTok Launch System <onboarding@resend.dev>';
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (audienceId) {
      try {
        await resend.contacts.create({
          email,
          audienceId,
          unsubscribed: false,
        });
      } catch (err) {
        console.error('Resend audience add failed:', err);
      }
    }

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your Account Warm-Up Checklist',
      html: buildWarmUpEmail(FROM),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead route error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildWarmUpEmail(_from?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tiktok-launch-system.vercel.app';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Account Warm-Up Checklist</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Courier New',Courier,monospace;color:#F2EDE4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;border-bottom:1px solid #1E1E1E;">
              <span style="font-family:'Courier New',monospace;font-size:16px;letter-spacing:0.15em;color:#F2EDE4;">
                TIKTOK<span style="color:#FF2D55;">.</span>LAUNCH
              </span>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:48px 0 16px;">
              <h1 style="font-family:'Arial Black',Arial,sans-serif;font-size:36px;line-height:1;letter-spacing:0.04em;color:#F2EDE4;margin:0;">
                ACCOUNT<br/>WARM-UP<br/><span style="color:#FF2D55;">CHECKLIST.</span>
              </h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:0 0 40px;border-bottom:1px solid #1E1E1E;">
              <p style="font-size:14px;color:#A89F92;line-height:1.75;margin:0;">
                Before you post a single piece of content, your account needs to look
                real to TikTok's algorithm. Here is the exact Day 1 to 3 protocol
                used to launch accounts that actually get reach.
              </p>
            </td>
          </tr>

          <!-- Day 1 -->
          <tr>
            <td style="padding:40px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 20px;">
                    <span style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#FF2D55;">Day 1</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;">
                    <span style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#F2EDE4;text-transform:uppercase;">
                      Account creation and setup
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 32px;border-bottom:1px solid #1E1E1E;">
                    <ul style="margin:12px 0 0;padding-left:20px;color:#A89F92;font-size:13px;line-height:2;">
                      <li>Create a fresh account with a VPN set to a US location</li>
                      <li>Use a new phone number or email (not linked to any existing account)</li>
                      <li>Set a profile photo and complete the bio (do not leave it blank)</li>
                      <li>Do NOT post anything today</li>
                      <li>Spend 20 to 30 minutes scrolling and watching content in your niche</li>
                      <li>Follow 5 to 10 accounts in your target niche</li>
                      <li>Like 15 to 20 videos relevant to your niche</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Day 2 -->
          <tr>
            <td style="padding:32px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 20px;">
                    <span style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#FF2D55;">Day 2</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;">
                    <span style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#F2EDE4;text-transform:uppercase;">
                      Signal reinforcement
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 32px;border-bottom:1px solid #1E1E1E;">
                    <ul style="margin:12px 0 0;padding-left:20px;color:#A89F92;font-size:13px;line-height:2;">
                      <li>Open the app for at least two separate sessions (morning and evening)</li>
                      <li>Watch at least 10 videos fully in each session (no skipping)</li>
                      <li>Leave 3 to 5 comments on popular videos in your niche</li>
                      <li>Follow 5 more accounts</li>
                      <li>Save 2 to 3 videos to your favourites</li>
                      <li>Still no posting</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Day 3 -->
          <tr>
            <td style="padding:32px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 20px;">
                    <span style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#FF2D55;">Day 3</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;">
                    <span style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#F2EDE4;text-transform:uppercase;">
                      First content upload
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 40px;border-bottom:1px solid #1E1E1E;">
                    <ul style="margin:12px 0 0;padding-left:20px;color:#A89F92;font-size:13px;line-height:2;">
                      <li>Keep the VPN active for the entire session</li>
                      <li>Post your first slide-style video using a pain-point hook</li>
                      <li>Post between 6pm and 9pm US Eastern Time</li>
                      <li>Do not delete or repost if views are slow in the first hour</li>
                      <li>Engage with comments within the first 30 minutes of posting</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:48px 0 0;">
              <p style="font-size:14px;color:#A89F92;line-height:1.75;margin:0 0 28px;">
                This checklist is just the foundation. The full system covers the
                complete KOL satellite strategy, viral slide framework, content at
                scale, and the VA playbook that lets you hand it all off.
              </p>
              <a href="${baseUrl}" style="display:inline-block;background:#FF2D55;color:#fff;font-family:'Courier New',monospace;font-size:13px;font-weight:700;letter-spacing:0.06em;text-decoration:none;padding:18px 28px;text-transform:uppercase;">
                Get the Full System &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:48px 0 0;border-top:1px solid #1E1E1E;margin-top:48px;">
              <p style="font-size:11px;color:#A89F92;letter-spacing:0.06em;margin:0;">
                TikTok Launch System &middot; You received this because you requested the free checklist.
                <br/>To unsubscribe, reply with "unsubscribe" to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
