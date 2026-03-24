import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Add contact to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (audienceId) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          unsubscribed: false,
        }),
      });
    }

    // Send the free checklist email
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "TikTok Launch System <onboarding@resend.dev>";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email,
        subject: "Your Free Account Warm-Up Checklist",
        html: `
          <div style="background:#0A0A0A;color:#F2EDE4;padding:40px;font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h1 style="font-size:28px;margin:0 0 8px;">Your Warm-Up Checklist</h1>
            <div style="width:60px;height:3px;background:#FF2D55;margin:16px 0 24px;"></div>
            <p style="color:#A89F92;font-size:15px;line-height:1.7;margin-bottom:24px;">
              Here is the exact 3-day account warm-up protocol from the TikTok Launch System.
              Follow this before posting any content.
            </p>

            <h2 style="font-size:18px;color:#FF2D55;margin:32px 0 12px;">DAY 1: ACCOUNT CREATION</h2>
            <ul style="color:#F2EDE4;font-size:14px;line-height:2;padding-left:20px;">
              <li>Create a fresh TikTok account with a new email</li>
              <li>Set region to US (remove SIM or use airplane mode + Wi-Fi)</li>
              <li>Connect through a residential VPN to a US server</li>
              <li>Browse your niche for 30 to 45 minutes</li>
              <li>Like 10 to 15 videos, follow 5 to 8 accounts</li>
              <li>Leave 2 to 3 genuine comments</li>
              <li>Do NOT post any content</li>
            </ul>

            <h2 style="font-size:18px;color:#FF2D55;margin:32px 0 12px;">DAY 2: DEEPEN ENGAGEMENT</h2>
            <ul style="color:#F2EDE4;font-size:14px;line-height:2;padding-left:20px;">
              <li>Repeat browsing session from Day 1</li>
              <li>Increase comments to 5 to 7</li>
              <li>Save videos to collections</li>
              <li>Share 1 to 2 videos externally</li>
              <li>Follow 3 to 5 more accounts</li>
              <li>Still do NOT post any content</li>
            </ul>

            <h2 style="font-size:18px;color:#FF2D55;margin:32px 0 12px;">DAY 3: FINAL WARM-UP</h2>
            <ul style="color:#F2EDE4;font-size:14px;line-height:2;padding-left:20px;">
              <li>Browse 20 to 30 minutes</li>
              <li>Comment on 3 to 5 videos</li>
              <li>Your For You page should now be heavily niche-weighted</li>
              <li>You are now ready to post your first content</li>
            </ul>

            <div style="border-top:1px solid #1E1E1E;margin:40px 0 24px;"></div>
            <p style="color:#A89F92;font-size:13px;line-height:1.6;">
              Want the full system? All 7 modules, the VA playbook, the viral slide framework,
              and lifetime community access for $149.
            </p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://tiktok-launch-system.vercel.app"}"
               style="display:inline-block;background:#FF2D55;color:#F2EDE4;padding:14px 28px;text-decoration:none;font-size:14px;font-weight:500;margin-top:12px;">
              Get the Full System
            </a>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json(
      { error: "Failed to process" },
      { status: 500 }
    );
  }
}
