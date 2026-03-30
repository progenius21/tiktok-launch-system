"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

const tickerItems = [
  "Account Warm-Up Protocol",
  "KOL Satellite Strategy",
  "335K+ Organic Views",
  "VA Execution Playbook",
  "US Market VPN Setup",
  "$0 Ad Spend",
];

const modules = [
  {
    num: "01",
    title: "Account Warm-Up System",
    desc: "How to create fresh accounts that TikTok treats as real users, not spam. Exact daily actions for days 1 to 3 before posting anything.",
    tag: "Foundation",
  },
  {
    num: "02",
    title: "VPN Setup for US Market",
    desc: "Step-by-step configuration to target the US market from anywhere in the world. Highest virality, highest install rates.",
    tag: "Setup",
  },
  {
    num: "03",
    title: "KOL Satellite Account Strategy",
    desc: "Build a network of influencer-style accounts that create FOMO and trust around your app. The exact method that generated 335K+ views organically.",
    tag: "Growth Engine",
  },
  {
    num: "04",
    title: "Viral Slide-Style TikTok Framework",
    desc: "The exact slideshow content formula. Problem hooks, solution reveal, subtle CTA. Proven to outperform video in terms of virality for most app niches.",
    tag: "Content",
  },
  {
    num: "05",
    title: "Content at Scale (30 Accounts)",
    desc: "Full sourcing system: Pinterest, Freepik, ChatGPT for hooks and translation, Canva for assembly. Build a week's content in under two hours.",
    tag: "Scale",
  },
  {
    num: "06",
    title: "VA Execution Playbook",
    desc: "Full SOPs, scripts, and quality-control checklists. Hire and onboard a VA to run the entire engine while you build the product.",
    tag: "Delegation",
  },
  {
    num: "07",
    title: "Private Founder Community",
    desc: "Lifetime access. Ask questions, share wins, get direct feedback from founders running the same system. No fluff, no noise.",
    tag: "Community",
  },
];

const viewCards = [
  { count: "246", unit: "K", type: "Top performing account", width: "100%" },
  { count: "35", unit: "K", type: "Combined smaller accounts", width: "14%" },
  { count: "31", unit: "K", type: "Second account", width: "13%" },
  { count: "23", unit: "K", type: "Third account", width: "9%" },
];

const realResults = [
  { num: "335K+", label: "Total Views" },
  { num: "$0", label: "Ad Spend" },
  { num: "6", label: "Active Accounts" },
  { num: "246K+", label: "Organic Reach" },
];

const features = [
  "Account Warm-Up System (shadowban-proof)",
  "VPN Setup for US Market Targeting",
  "KOL Satellite Account Playbook",
  "Viral Slide-Style TikTok Framework",
  "Content at Scale System (30 accounts)",
  "VA Execution Playbook with full SOPs",
  "Private Founder Community (lifetime access)",
  "Future updates at no extra cost",
];

const faqs = [
  {
    q: "Do I need to be a TikTok expert?",
    a: "No. The system is designed so anyone can follow it and eventually hand it off to a VA entirely. You don't need followers or prior TikTok experience to start.",
  },
  {
    q: "What kind of apps does this work for?",
    a: "Any consumer or B2B SaaS app with a clear use case. The framework works best when your app solves a specific, relatable pain point you can communicate in a 30-second slide video.",
  },
  {
    q: "How fast can I expect results?",
    a: "Most founders following the system start seeing consistent daily installs within 2 to 4 weeks of posting. Reaching 10K users depends on your posting consistency and niche size.",
  },
  {
    q: "What if I'm not in the US?",
    a: "That's exactly what the VPN setup module covers. You can target the US market from anywhere in the world. The warm-up protocol also accounts for geo-targeting, so keep the VPN active the entire time you're using TikTok.",
  },
  {
    q: "Is this a one-time payment?",
    a: "Yes. $149 gets you lifetime access to the full system, playbooks, and community. No subscriptions, no upsells, no surprises.",
  },
];

export default function Home() {
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [leadEmail, setLeadEmail] = useState('');
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState('');

  async function handleCheckout() {
    setLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setCheckoutError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  async function handleLead(e: FormEvent) {
    e.preventDefault();
    if (!leadEmail) return;
    setLeadLoading(true);
    setLeadError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setLeadSuccess(true);
      } else {
        setLeadError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setLeadError('Network error. Please try again.');
    } finally {
      setLeadLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    document
      .querySelectorAll(".module-row, .problem-cell, .view-card, .result-card")
      .forEach((el) => {
        el.classList.add("fade-el");
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  function toggleFAQ(index: number) {
    const item = faqRefs.current[index];
    if (!item) return;
    const isOpen = item.classList.contains("open");
    faqRefs.current.forEach((el) => el?.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  }

  const tickerContent = [...tickerItems, ...tickerItems];

  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <button className="nav-cta" onClick={handleCheckout} disabled={loading} type="button">
          {loading ? "Loading..." : "Get Access →"}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="hero-ticker">
          <div className="ticker-track">
            {tickerContent.map((item, i) => (
              <span key={i}>
                <span className="ticker-item">{item}</span>
                <span className="ticker-dot" style={{ marginLeft: 60 }}>■</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-body">
          <div>
            <div className="hero-headline">
              0 TO
              <br />
              10,000
              <br />
              <span className="accent-line">users.</span>
              ZERO
              <br />
              AD SPEND.
            </div>
          </div>
          <div className="hero-right">
            <p className="hero-desc">
              The exact TikTok system used to take apps from invisible to
              thousands of daily downloads. No ads. No tricks. A repeatable
              content engine you can hand to a VA.
            </p>
            <div className="hero-price-block">
              <span className="price-label">One-time investment</span>
              <span className="price-num">$149</span>
              <span className="price-sub">
                Lifetime access · Instant delivery · No subscription
              </span>
            </div>
            <div className="hero-cta-group">
              <button className="btn-primary" onClick={handleCheckout} disabled={loading} type="button">
                {loading ? "Redirecting..." : "Get Instant Access"}
                <span className="arrow">→</span>
              </button>
              <span className="btn-sub">Secure checkout via Stripe</span>
              {checkoutError && (
                <span className="checkout-error">{checkoutError}</span>
              )}
            </div>
          </div>
        </div>

        <div className="proof-bar">
          <div className="proof-item">
            <span className="proof-num">
              10<span className="unit">K+</span>
            </span>
            <span className="proof-label">Users from a single channel</span>
          </div>
          <div className="proof-item">
            <span className="proof-num">
              $<span className="unit">0</span>
            </span>
            <span className="proof-label">Paid to any ad network</span>
          </div>
          <div className="proof-item">
            <span className="proof-num">
              335<span className="unit">K+</span>
            </span>
            <span className="proof-label">Views generated organically</span>
          </div>
          <div className="proof-item">
            <span className="proof-num">1</span>
            <span className="proof-label">System. Repeatable on any app.</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section>
        <div className="section-tag">The Problem</div>
        <div className="section-title">
          YOU BUILT
          <br />
          SOMETHING GREAT.
          <br />
          NOBODY KNOWS IT.
        </div>
        <div className="problem-grid">
          <div className="problem-cell">
            <span className="cell-num">01</span>
            <div className="cell-title">Organic search is too slow</div>
            <p className="cell-body">
              SEO takes months. By the time you rank, your runway is gone. You
              need users now, not in six months.
            </p>
          </div>
          <div className="problem-cell highlight">
            <span className="cell-num">02</span>
            <div className="cell-title">Paid ads burn cash fast</div>
            <p className="cell-body">
              Facebook and Google CAC is brutal for early-stage apps. You're
              competing against funded companies with infinite budgets.
            </p>
          </div>
          <div className="problem-cell highlight">
            <span className="cell-num">03</span>
            <div className="cell-title">Cold outreach doesn't scale</div>
            <p className="cell-body">
              Manual DMs and emails get you a trickle. You need a system that
              compounds, not one that depends on your time every day.
            </p>
          </div>
          <div className="problem-cell">
            <span className="cell-num">04</span>
            <div className="cell-title">Meanwhile, someone else wins</div>
            <p className="cell-body">
              A founder with the exact same type of app is pulling millions of
              TikTok views and stacking downloads weekly. The difference isn't
              luck. It's a system.
            </p>
          </div>
        </div>
      </section>

      {/* VIEW COUNTS */}
      <section>
        <div className="section-tag">Proof It Works</div>
        <div className="section-title">
          REAL NUMBERS
          <br />
          FROM THE SYSTEM
        </div>
        <div className="views-strip">
          {viewCards.map((card, i) => (
            <div className="view-card" key={i}>
              <span className="view-count">
                {card.count}
                <span className="unit">{card.unit}</span>
              </span>
              <span className="view-type">{card.type}</span>
              <div className="view-bar">
                <div
                  className="view-bar-fill"
                  style={{ width: card.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES */}
      <section>
        <div className="section-tag">What's Inside</div>
        <div className="section-title">
          THE COMPLETE
          <br />
          OPERATING SYSTEM
        </div>
        <div className="modules-list">
          {modules.map((mod, i) => (
            <div className="module-row" key={i}>
              <span className="module-num">{mod.num}</span>
              <div className="module-info">
                <div className="module-title">{mod.title}</div>
                <div className="module-desc">{mod.desc}</div>
              </div>
              <span className="module-tag">{mod.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* REAL RESULTS */}
      <section>
        <div className="section-tag">Real Results</div>
        <div className="section-title">
          NUMBERS
          <br />
          DON&apos;T LIE.
        </div>
        <div className="results-grid">
          {realResults.map((r, i) => (
            <div className="result-card" key={i}>
              <div className="result-num">{r.num}</div>
              <div className="result-label">{r.label}</div>
            </div>
          ))}
        </div>
        <p className="results-note">
          Tracked across active accounts running the system with zero paid promotion.
        </p>
      </section>

      {/* PRICING */}
      <section>
        <div className="section-tag">Pricing</div>
        <div className="section-title">
          ONE PRICE.
          <br />
          LIFETIME ACCESS.
        </div>

        {/* LIMITED SPOTS BANNER */}
        <div className="scarcity-banner">
          <span className="scarcity-dot" />
          <span className="scarcity-text">
            Limited to 50 founders per cohort to keep the community high-signal. Spots are filling.
          </span>
        </div>

        <div className="pricing-wrapper">
          <div className="pricing-left">
            <div>
              <div className="pricing-big-num">
                <span className="dollar">$</span>149
              </div>
              <p className="pricing-desc" style={{ marginTop: 16 }}>
                One-time payment. No subscription. No upsells. The $149 pays for
                itself the moment your first 100 users convert into subscribers.
              </p>
            </div>
            <div>
              <button className="btn-primary" onClick={handleCheckout} disabled={loading} type="button">
                {loading ? "Redirecting..." : "Get Instant Access →"}
              </button>
              <p className="btn-sub" style={{ marginTop: 10 }}>
                Secure checkout via Stripe · Instant delivery
              </p>
              {checkoutError && (
                <p className="checkout-error">{checkoutError}</p>
              )}
            </div>
          </div>
          <div className="pricing-right">
            <div className="pricing-features">
              {features.map((f, i) => (
                <div className="feature-row" key={i}>
                  <div className="feature-check">✓</div>
                  <span className="feature-text">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="section-tag">FAQ</div>
        <div className="section-title">
          COMMON
          <br />
          QUESTIONS
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              className="faq-item"
              key={i}
              ref={(el) => { faqRefs.current[i] = el; }}
            >
              <button
                className="faq-q"
                onClick={() => toggleFAQ(i)}
                type="button"
              >
                {faq.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="lead-section">
        <div className="section-tag">Free Resource</div>
        <div className="section-title">
          GET THE
          <br />
          WARM-UP CHECKLIST.
        </div>
        <p style={{ color: 'var(--warm-grey)', fontSize: 14, lineHeight: 1.75, maxWidth: 480, marginBottom: 32 }}>
          The exact Day 1 to 3 account warm-up protocol. Sent to your inbox
          instantly. No spam, no fluff.
        </p>
        {leadSuccess ? (
          <div className="lead-success">
            Checklist sent. Check your inbox.
          </div>
        ) : (
          <form className="lead-form" onSubmit={handleLead}>
            <input
              className="lead-input"
              type="email"
              placeholder="your@email.com"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              required
            />
            <button
              className="lead-btn"
              type="submit"
              disabled={leadLoading}
            >
              {leadLoading ? 'Sending...' : 'Send Checklist'}
            </button>
          </form>
        )}
        {leadError && (
          <p style={{ color: 'var(--accent)', fontSize: 12, marginTop: 12 }}>{leadError}</p>
        )}
      </section>

      {/* FINAL CTA */}
      <section className="final-cta-section">
        <div className="section-tag" style={{ justifyContent: "center" }}>
          Final Word
        </div>
        <div className="section-title">
          YOUR APP DESERVES
          <br />
          10,000 USERS.
        </div>
        <p className="final-cta-desc">
          Stop waiting for word of mouth. One proven system. Zero ad spend. Real
          users. The system is live and working right now.
        </p>
        <button
          className="btn-primary final-cta-btn"
          onClick={handleCheckout}
          disabled={loading}
          type="button"
        >
          {loading ? "Redirecting..." : "Get Instant Access, $149"}
          <span className="arrow">→</span>
        </button>
        <p className="btn-sub" style={{ marginTop: 16 }}>
          One-time · No subscription · Lifetime access
        </p>
        {checkoutError && (
          <p className="checkout-error" style={{ marginTop: 12 }}>{checkoutError}</p>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <a className="footer-logo" href="#">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <div className="footer-links">
          <a href="/privacy" className="footer-copy footer-privacy-link">
            Privacy Policy
          </a>
          <span className="footer-copy">© 2026 · All rights reserved</span>
        </div>
      </footer>
    </>
  );
}
