import type { Metadata } from "next";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

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

export default async function ThankYou({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id || !stripe) {
    redirect("/");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      redirect("/");
    }
  } catch {
    redirect("/");
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* NAV */}
      <nav aria-label="Main navigation">
        <a className="nav-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <a className="nav-cta" href="/" style={{ textDecoration: "none" }}>
          Back to Home <span aria-hidden="true">→</span>
        </a>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <section className="ty-hero">
          <div className="section-tag" aria-hidden="true">Purchase Confirmed</div>
          <h1 className="ty-headline">YOU&apos;RE IN.</h1>
          <p className="ty-welcome">
            Welcome to the TikTok Launch System. You now have everything you need
            to take your app from invisible to 10,000 users without spending a
            single penny on ads. The playbook is waiting. The system is proven.
            Start today.
          </p>
          <div className="ty-confirm-badge" role="status">
            <span className="ty-confirm-check" aria-hidden="true">✓</span>
            <span className="ty-confirm-text">
              Payment received · Lifetime access granted · Instant delivery
            </span>
          </div>
        </section>

        {/* WHAT TO DO NOW */}
        <section aria-labelledby="next-steps-heading">
          <div className="section-tag" aria-hidden="true">Next Steps</div>
          <h2 className="section-title" id="next-steps-heading">
            WHAT TO DO
            <br />
            RIGHT NOW
          </h2>
          <ol className="ty-steps">
            {steps.map((step) => (
              <li className="ty-step-row" key={step.num}>
                <span className="ty-step-num" aria-hidden="true">{step.num}</span>
                <div className="ty-step-body">
                  <h3 className="ty-step-title">{step.title}</h3>
                  <p className="ty-step-desc">{step.desc}</p>
                  {step.link && (
                    <a
                      className="ty-step-link"
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {step.linkText}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* PERMANENT ACCESS */}
        <section className="ty-access-section" aria-labelledby="access-heading">
          <div className="ty-access-inner">
            <div className="ty-access-glyph" aria-hidden="true">∞</div>
            <div className="ty-access-content">
              <div className="ty-access-tag">
                <div className="section-tag" style={{ marginBottom: 0 }} aria-hidden="true">
                  Ownership
                </div>
              </div>
              <h2 className="ty-access-title" id="access-heading">
                YOUR ACCESS IS PERMANENT.
                <br />
                NO SUBSCRIPTION.
                <br />
                COME BACK ANY TIME.
              </h2>
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
        <section className="ty-reminder-section" aria-labelledby="reminder-heading">
          <div className="section-tag" style={{ justifyContent: "center" }} aria-hidden="true">
            Reminder
          </div>
          <h2
            className="section-title"
            id="reminder-heading"
            style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 24px" }}
          >
            START WITH
            <br />
            MODULE 01.
          </h2>
          <p className="ty-reminder-desc">
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
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer role="contentinfo">
        <a className="footer-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <span className="footer-copy">© 2026 · All rights reserved</span>
      </footer>
    </>
  );
}
