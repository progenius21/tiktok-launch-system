import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://tiklaunch.io';

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'TikTok Launch System <onboarding@resend.dev>';

const NOTION_URL =
  'https://www.notion.so/32ba77c20e9381c7a9fcf3494e14f8b9';

const COMMUNITY_URL = 'https://t.me/+Rmp0w4E4y0ZiNDU8';

export async function sendDeliveryEmail(email: string): Promise<void> {
  if (!resend) {
    console.log(`[Email delivery skipped - no RESEND_API_KEY] Would send to: ${email}`);
    return;
  }

  const pdfUrl = `${BASE_URL}/TikTok-Launch-System-Guide.pdf`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're in. Here's your TikTok Launch System.",
    html: buildEmailHTML(pdfUrl, NOTION_URL, COMMUNITY_URL),
  });

  console.log(`Delivery email sent to: ${email}`);
}

function buildEmailHTML(
  pdfUrl: string,
  notionUrl: string,
  communityUrl: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You are in. Here is your TikTok Launch System.</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0A0A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="border:1px solid #FF2D55;padding:16px 24px;background:#0A0A0A;">
              <span style="font-size:13px;font-weight:700;color:#FF2D55;letter-spacing:0.15em;font-family:'Courier New',Courier,monospace;">TIKTOK.LAUNCH</span>
            </td>
          </tr>

          <tr><td style="height:40px;"></td></tr>

          <!-- Headline -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <h1 style="margin:0;font-size:52px;font-weight:700;color:#F2EDE4;line-height:1;font-family:'Courier New',Courier,monospace;letter-spacing:-0.02em;">YOU ARE IN.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 40px 0;">
              <p style="margin:0;font-size:15px;color:#A89F92;line-height:1.7;font-family:'Courier New',Courier,monospace;">
                Your purchase is confirmed. Everything you need to take your app from invisible to 10,000 users is ready below. No ads. No subscriptions. Just the system.
              </p>
            </td>
          </tr>

          <!-- Section 01: PDF Download -->
          <tr>
            <td style="border:1px solid #333;padding:28px;background:#111111;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:10px;color:#FF2D55;letter-spacing:0.15em;font-weight:700;margin-bottom:12px;font-family:'Courier New',Courier,monospace;">01 / PDF GUIDE</div>
                    <div style="font-size:20px;color:#F2EDE4;font-weight:700;margin-bottom:10px;font-family:'Courier New',Courier,monospace;">TikTok Launch System Guide</div>
                    <p style="margin:0 0 20px 0;font-size:13px;color:#A89F92;line-height:1.6;font-family:'Courier New',Courier,monospace;">The complete playbook. All 7 modules in one document. Download and save it.</p>
                    <a href="${pdfUrl}" style="display:inline-block;background:#FF2D55;color:#0A0A0A;font-size:12px;font-weight:700;letter-spacing:0.1em;padding:14px 28px;text-decoration:none;font-family:'Courier New',Courier,monospace;">DOWNLOAD PDF &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:2px;background:#0A0A0A;"></td></tr>

          <!-- Section 02: Notion Guide -->
          <tr>
            <td style="border:1px solid #333;padding:28px;background:#111111;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:10px;color:#FF2D55;letter-spacing:0.15em;font-weight:700;margin-bottom:12px;font-family:'Courier New',Courier,monospace;">02 / NOTION GUIDE</div>
                    <div style="font-size:20px;color:#F2EDE4;font-weight:700;margin-bottom:10px;font-family:'Courier New',Courier,monospace;">Full System in Notion</div>
                    <p style="margin:0 0 20px 0;font-size:13px;color:#A89F92;line-height:1.6;font-family:'Courier New',Courier,monospace;">The interactive version of the guide. All modules, SOPs, and checklists in one place. Bookmark it.</p>
                    <a href="${notionUrl}" style="display:inline-block;border:1px solid #F2EDE4;color:#F2EDE4;font-size:12px;font-weight:700;letter-spacing:0.1em;padding:14px 28px;text-decoration:none;font-family:'Courier New',Courier,monospace;">OPEN NOTION GUIDE &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:2px;background:#0A0A0A;"></td></tr>

          <!-- Section 03: Community -->
          <tr>
            <td style="border:1px solid #333;padding:28px;background:#111111;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:10px;color:#FF2D55;letter-spacing:0.15em;font-weight:700;margin-bottom:12px;font-family:'Courier New',Courier,monospace;">03 / COMMUNITY</div>
                    <div style="font-size:20px;color:#F2EDE4;font-weight:700;margin-bottom:10px;font-family:'Courier New',Courier,monospace;">Private Founder Community</div>
                    <p style="margin:0 0 20px 0;font-size:13px;color:#A89F92;line-height:1.6;font-family:'Courier New',Courier,monospace;">Join the private Telegram group. Ask questions, share wins, get direct feedback from founders running the same system.</p>
                    <a href="${communityUrl}" style="display:inline-block;border:1px solid #555;color:#A89F92;font-size:12px;font-weight:700;letter-spacing:0.1em;padding:14px 28px;text-decoration:none;font-family:'Courier New',Courier,monospace;">JOIN COMMUNITY &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:40px;"></td></tr>

          <!-- Permanent access notice -->
          <tr>
            <td style="border:1px solid #222;padding:24px;">
              <p style="margin:0;font-size:13px;color:#A89F92;line-height:1.8;font-family:'Courier New',Courier,monospace;">
                <strong style="color:#F2EDE4;">Your access is permanent.</strong> The $149 you paid is the only payment you will ever make. No renewal dates. No locked modules. No upsell waiting around the corner. Every future update to the system lands at no extra cost.
              </p>
            </td>
          </tr>

          <tr><td style="height:32px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #222;padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#444;font-family:'Courier New',Courier,monospace;">
                TIKTOK.LAUNCH &middot; You are receiving this because you purchased the TikTok Launch System.
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
