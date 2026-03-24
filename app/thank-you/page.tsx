import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're In — TikTok Launch System",
  description:
    "Your access to the TikTok Launch System is confirmed. Here is what to do next.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    num: "01",
    title: "Check your email",
    desc: "Your guide download link has been sent to the address you used at checkout. If it has not arrived within five minutes, check your spam folder and mark it as safe.",
    link: null,
    linkText: null,
  },
  {
    num: "02",
    title: "Join the private founder community",
    desc: "Join the private Telegram group. Come in, introduce yourself, and tell us what app you are launching. Every founder in there is running the same system.",
    link: "https://t.me/+Rmp0w4E4y0ZiNDU8",
    linkText: "Join the Telegram Community →",
  },
  {
    num: "03",
    title: "Start with Module 01: Account Warm-Up",
    desc: "Do not skip this. The warm-up protocol is what separates accounts that go viral from accounts that get suppressed on day one. Read it before you post anything.",
    link: null,
    linkText: null,
  },
];

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ThankYou({ searchParams: _ }: Props) {
  // session_id is passed by Stripe after successful checkout
  // it is available in the URL but no verification is needed here
  // the webhook handles fulfillment
  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <a className="nav-cta" href="/">
          Back to Home →
        </a>
      </nav>

      {/* HERO */}
      <section className="ty-hero">
        <div className="section-tag">Purchase Confirmed</div>
        <h1 className="ty-headline">YOU&apos;RE IN.</h1>
        <p className="ty-welcome">
          Welcome to the TikTok Launch System. You now have everything you need
          to take your app from invisible to 10,000 users without spending a
          single penny on ads. The playbook is waiting. The system is proven.
          Start today.
        </p>
        <div className="ty-confirm-badge">
          <span className="ty-confirm-check">✓</span>
          <span className="ty-confirm-text">
            Payment received · Lifetime access granted · Instant delivery
          </span>
        </div>
      </section>

      {/* WHAT TO DO NOW */}
      <section>
        <div className="section-tag">Next Steps</div>
        <div className="section-title">
          WHAT TO DO
          <br />
          RIGHT NOW
        </div>
        <div className="ty-steps">
          {steps.map((step) => (
            <div className="ty-step-row" key={step.num}>
              <span className="ty-step-num">{step.num}</span>
              <div className="ty-step-body">
                <div className="ty-step-title">{step.title}</div>
                <p className="ty-step-desc">{step.desc}</p>
                {step.link && (
                  <a className="ty-step-link" href={step.link}>
                    {step.linkText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERMANENT ACCESS */}
      <section className="ty-access-section">
        <div className="ty-access-inner">
          <div className="ty-access-glyph">∞</div>
          <div className="ty-access-content">
            <div className="ty-access-tag">
              <div className="section-tag" style={{ marginBottom: 0 }}>
                Ownership
              </div>
            </div>
            <div className="ty-access-title">
              YOUR ACCESS IS PERMANENT.
              <br />
              NO SUBSCRIPTION.
              <br />
              COME BACK ANY TIME.
            </div>
            <p className="ty-access-desc">
              The $149 you paid is the only payment you will ever make. No
              renewal dates. No locked modules. No upsell waiting around the
              corner. Every future update to the system lands in your account at
              no extra cost. Build one app with it or ten. The system is yours.
            </p>
          </div>
        </div>
      </section>

      {/* REMINDER CTA */}
      <section className="ty-reminder-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>
          Reminder
        </div>
        <div
          className="section-title"
          style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 24px" }}
        >
          START WITH
          <br />
          MODULE 01.
        </div>
        <p
          style={{
            color: "var(--warm-grey)",
            fontSize: 15,
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            textAlign: "center",
          }}
        >
          The account warm-up is the foundation everything else is built on.
          Skip it and the algorithm will suppress you before you even start.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            className="btn-primary"
            href="/"
            style={{ display: "inline-flex", gap: 20, fontSize: 14, padding: "18px 36px" }}
          >
            View Full System Overview
            <span className="arrow">→</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <a className="footer-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <span className="footer-copy">© 2026 · All rights reserved</span>
      </footer>
    </>
  );
}
