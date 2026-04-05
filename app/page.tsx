"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import ExitIntentPopup from "@/components/ExitIntentPopup";

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
  {
    q: "Is this still working in 2026?",
    a: "Yes. The system is actively running across multiple accounts right now. TikTok's algorithm still heavily rewards the satellite account structure and slide-format content. The warm-up protocol has been updated to reflect TikTok's current detection patterns. The founders in the community are posting results weekly.",
  },
];

export default function Home() {
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
    setOpenFAQ(openFAQ === index ? null : index);
    const isOpen = item.classList.contains("open");
    faqRefs.current.forEach((el) => el?.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  }

  const tickerContent = [...tickerItems, ...tickerItems];

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "TikTok Launch System",
    "description": "The exact TikTok system used to take apps from invisible to thousands of daily downloads. No ads. No tricks. A repeatable content engine you can hand to a VA.",
    "url": "https://tiklaunch.io",
    "brand": {
      "@type": "Brand",
      "name": "TikTok Launch System"
    },
    "offers": {
      "@type": "Offer",
      "price": "149",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://tiklaunch.io",
      "priceValidUntil": "2027-12-31"
    }
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TikTok Launch System",
    "url": "https://tiklaunch.io",
    "description": "Organic TikTok growth system for app founders. 0 to 10K users, $0 ad spend.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tiklaunch.io/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* NAV */}
      <nav aria-label="Main navigation">
        <a className="nav-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <div className="nav-right">
          <a className="nav-link" href="/tools/hook-generator">Free Hook Generator</a>
          <button
            className="nav-cta"
            onClick={handleCheckout}
            disabled={loading}
            type="button"
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Get Access →"}
          </button>
        </div>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <section className="hero" style={{ paddingBottom: 0 }}>
          <div className="hero-ticker" aria-hidden="true">
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
              <h1 className="hero-headline">
                0 TO
                <br />
                10,000
                <br />
                <span className="accent-line">users.</span>
                ZERO
                <br />
                AD SPEND.
              </h1>
            </div>
            <div className="hero-right">
              <p className="hero-desc">
                The exact TikTok system used to take apps from invisible to
                thousands of daily downloads. No ads. No tricks. A repeatable
                content engine you can hand to a VA.
              </p>
              <div className="hero-price-block">
                <span className="price-label">One-time investment</span>
                <span className="price-num" aria-label="$149">$149</span>
                <span className="price-sub">
                  Lifetime access · Instant delivery · No subscription
                </span>
              </div>
              <div className="hero-cta-group">
                <button
                  className="btn-primary"
                  onClick={handleCheckout}
                  disabled={loading}
                  type="button"
                  aria-busy={loading}
                  aria-label={loading ? "Redirecting to checkout" : "Get instant access to TikTok Launch System"}
                >
                  {loading ? "Redirecting..." : "Get Instant Access"}
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
                <span className="btn-sub">Secure checkout via Stripe</span>
                {checkoutError && (
                  <span className="checkout-error" role="alert" aria-live="assertive">
                    {checkoutError}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="proof-bar" role="list" aria-label="Key results">
            <div className="proof-item" role="listitem">
              <span className="proof-num">
                10<span className="unit" aria-hidden="true">K+</span>
              </span>
              <span className="proof-label">Users from a single channel</span>
            </div>
            <div className="proof-item" role="listitem">
              <span className="proof-num">
                $<span className="unit" aria-hidden="true">0</span>
              </span>
              <span className="proof-label">Paid to any ad network</span>
            </div>
            <div className="proof-item" role="listitem">
              <span className="proof-num">
                335<span className="unit" aria-hidden="true">K+</span>
              </span>
              <span className="proof-label">Views generated organically</span>
            </div>
            <div className="proof-item" role="listitem">
              <span className="proof-num">1</span>
              <span className="proof-label">System. Repeatable on any app.</span>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section aria-labelledby="problem-heading">
          <div className="section-tag" aria-hidden="true">The Problem</div>
          <h2 className="section-title" id="problem-heading">
            YOU BUILT
            <br />
            SOMETHING GREAT.
            <br />
            NOBODY KNOWS IT.
          </h2>
          <div className="problem-grid" role="list">
            <div className="problem-cell" role="listitem">
              <span className="cell-num" aria-hidden="true">01</span>
              <h3 className="cell-title">Organic search is too slow</h3>
              <p className="cell-body">
                SEO takes months. By the time you rank, your runway is gone. You
                need users now, not in six months.
              </p>
            </div>
            <div className="problem-cell highlight" role="listitem">
              <span className="cell-num" aria-hidden="true">02</span>
              <h3 className="cell-title">Paid ads burn cash fast</h3>
              <p className="cell-body">
                Facebook and Google CAC is brutal for early-stage apps. You&apos;re
                competing against funded companies with infinite budgets.
              </p>
            </div>
            <div className="problem-cell highlight" role="listitem">
              <span className="cell-num" aria-hidden="true">03</span>
              <h3 className="cell-title">Cold outreach doesn&apos;t scale</h3>
              <p className="cell-body">
                Manual DMs and emails get you a trickle. You need a system that
                compounds, not one that depends on your time every day.
              </p>
            </div>
            <div className="problem-cell" role="listitem">
              <span className="cell-num" aria-hidden="true">04</span>
              <h3 className="cell-title">Meanwhile, someone else wins</h3>
              <p className="cell-body">
                A founder with the exact same type of app is pulling millions of
                TikTok views and stacking downloads weekly. The difference isn&apos;t
                luck. It&apos;s a system.
              </p>
            </div>
          </div>
        </section>

        {/* VIEW COUNTS */}
        <section aria-labelledby="proof-heading">
          <div className="section-tag" aria-hidden="true">Proof It Works</div>
          <h2 className="section-title" id="proof-heading">
            REAL NUMBERS
            <br />
            FROM THE SYSTEM
          </h2>
          <div className="views-strip" role="list" aria-label="View counts by account">
            {viewCards.map((card, i) => (
              <div className="view-card" key={i} role="listitem">
                <span className="view-count" aria-label={`${card.count}${card.unit} views`}>
                  {card.count}
                  <span className="unit" aria-hidden="true">{card.unit}</span>
                </span>
                <span className="view-type">{card.type}</span>
                <div className="view-bar" role="img" aria-label={`${card.width} of total views`}>
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
        <section aria-labelledby="modules-heading">
          <div className="section-tag" aria-hidden="true">What&apos;s Inside</div>
          <h2 className="section-title" id="modules-heading">
            THE COMPLETE
            <br />
            OPERATING SYSTEM
          </h2>
          <div className="modules-list" role="list">
            {modules.map((mod, i) => (
              <div className="module-row" key={i} role="listitem">
                <span className="module-num" aria-hidden="true">{mod.num}</span>
                <div className="module-info">
                  <h3 className="module-title">{mod.title}</h3>
                  <div className="module-desc">{mod.desc}</div>
                </div>
                <span className="module-tag" aria-label={`Category: ${mod.tag}`}>{mod.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* REAL RESULTS */}
        <section aria-labelledby="results-heading">
          <div className="section-tag" aria-hidden="true">Real Results</div>
          <h2 className="section-title" id="results-heading">
            NUMBERS
            <br />
            DON&apos;T LIE.
          </h2>
          <div className="results-grid" role="list" aria-label="Results summary">
            {realResults.map((r, i) => (
              <div className="result-card" key={i} role="listitem">
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
        <section aria-labelledby="pricing-heading">
          <div className="section-tag" aria-hidden="true">Pricing</div>
          <h2 className="section-title" id="pricing-heading">
            ONE PRICE.
            <br />
            LIFETIME ACCESS.
          </h2>

          {/* LIMITED SPOTS BANNER */}
          <div className="scarcity-banner" role="status">
            <span className="scarcity-dot" aria-hidden="true" />
            <span className="scarcity-text">
              Limited to 50 founders per cohort to keep the community high-signal. Spots are filling.
            </span>
          </div>

          <div className="pricing-wrapper">
            <div className="pricing-left">
              <div>
                <div className="pricing-big-num" aria-label="$149">
                  <span className="dollar" aria-hidden="true">$</span>149
                </div>
                <p className="pricing-desc" style={{ marginTop: 16 }}>
                  One-time payment. No subscription. No upsells. The $149 pays for
                  itself the moment your first 100 users convert into subscribers.
                </p>
              </div>
              <div>
                <button
                  className="btn-primary"
                  onClick={handleCheckout}
                  disabled={loading}
                  type="button"
                  aria-busy={loading}
                >
                  {loading ? "Redirecting..." : "Get Instant Access →"}
                </button>
                <p className="btn-sub" style={{ marginTop: 10 }}>
                  Secure checkout via Stripe · Instant delivery
                </p>
                {checkoutError && (
                  <p className="checkout-error" role="alert" aria-live="assertive">
                    {checkoutError}
                  </p>
                )}
              </div>
            </div>
            <div className="pricing-right">
              <ul className="pricing-features" aria-label="What's included">
                {features.map((f, i) => (
                  <li className="feature-row" key={i}>
                    <span className="feature-check" aria-hidden="true">✓</span>
                    <span className="feature-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading">
          <div className="section-tag" aria-hidden="true">FAQ</div>
          <h2 className="section-title" id="faq-heading">
            COMMON
            <br />
            QUESTIONS
          </h2>
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
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {faq.q}
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div
                  className="faq-a"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <div className="faq-a-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEAD CAPTURE */}
        <section className="lead-section" aria-labelledby="lead-heading">
          <div className="section-tag" aria-hidden="true">Free Resource</div>
          <h2 className="section-title" id="lead-heading">
            GET THE
            <br />
            WARM-UP CHECKLIST.
          </h2>
          <p className="lead-desc-text">
            The exact Day 1 to 3 account warm-up protocol. Sent to your inbox
            instantly. No spam, no fluff.
          </p>
          {leadSuccess ? (
            <div className="lead-success" role="status" aria-live="polite">
              Checklist sent. Check your inbox.
            </div>
          ) : (
            <form className="lead-form" onSubmit={handleLead} aria-label="Get the warm-up checklist">
              <label htmlFor="lead-email" className="sr-only">Email address</label>
              <input
                id="lead-email"
                className="lead-input"
                type="email"
                placeholder="your@email.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
                aria-describedby={leadError ? "lead-error" : undefined}
              />
              <button
                className="lead-btn"
                type="submit"
                disabled={leadLoading}
                aria-busy={leadLoading}
              >
                {leadLoading ? 'Sending...' : 'Send Checklist'}
              </button>
            </form>
          )}
          {leadError && (
            <p
              id="lead-error"
              className="lead-error-text"
              role="alert"
              aria-live="assertive"
            >
              {leadError}
            </p>
          )}
        </section>

        {/* FINAL CTA */}
        <section className="final-cta-section" aria-labelledby="cta-heading">
          <div className="section-tag" style={{ justifyContent: "center" }} aria-hidden="true">
            Final Word
          </div>
          <h2 className="section-title" id="cta-heading">
            YOUR APP DESERVES
            <br />
            10,000 USERS.
          </h2>
          <p className="final-cta-desc">
            Stop waiting for word of mouth. One proven system. Zero ad spend. Real
            users. The system is live and working right now.
          </p>
          <button
            className="btn-primary final-cta-btn"
            onClick={handleCheckout}
            disabled={loading}
            type="button"
            aria-busy={loading}
          >
            {loading ? "Redirecting..." : "Get Instant Access, $149"}
            <span className="arrow" aria-hidden="true">→</span>
          </button>
          <p className="btn-sub" style={{ marginTop: 16 }}>
            One-time · No subscription · Lifetime access
          </p>
          {checkoutError && (
            <p className="checkout-error" role="alert" aria-live="assertive" style={{ marginTop: 12 }}>
              {checkoutError}
            </p>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer role="contentinfo">
        <a className="footer-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <div className="footer-links">
          <a href="/privacy" className="footer-copy footer-privacy-link">
            Privacy Policy
          </a>
          <span className="footer-copy">© 2026 · All rights reserved</span>
        </div>
      </footer>

      <ExitIntentPopup />
    </>
  );
}
