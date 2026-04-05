'use client';

import { useState, FormEvent, useCallback } from 'react';
import Link from 'next/link';

interface Hook {
  text: string;
  category: string;
  format: string;
}

const CATEGORIES = ['curiosity', 'controversy', 'storytelling', 'direct', 'trend-jack'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  curiosity: 'Curiosity',
  controversy: 'Controversy',
  storytelling: 'Storytelling',
  direct: 'Direct',
  'trend-jack': 'Trend-Jack',
};

const FORMAT_LABELS: Record<string, string> = {
  'talking-head': 'Talking Head',
  'screen-record': 'Screen Record',
  slideshow: 'Slideshow',
  'text-on-screen': 'Text on Screen',
  'duet-stitch': 'Duet / Stitch',
};

export default function HookGeneratorPage() {
  const [appName, setAppName] = useState('');
  const [appNiche, setAppNiche] = useState('');
  const [email, setEmail] = useState('');
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const copyToClipboard = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!appName || !appNiche || !email || cooldown) return;

    setLoading(true);
    setError('');
    setHooks([]);

    // Fire email capture first (non-blocking)
    fetch('/api/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'hook-generator' }),
    }).catch(() => {
      // Email capture failure should not block hook generation
    });

    try {
      const res = await fetch('/api/generate-hooks-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, appNiche }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate hooks');
      }

      const data = await res.json();

      if (data.hooks && Array.isArray(data.hooks)) {
        setHooks(data.hooks);
        setHasGenerated(true);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      // 10-second cooldown
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);
    }
  }

  function handleReset() {
    setHooks([]);
    setError('');
    setHasGenerated(false);
    // Keep email pre-filled
  }

  const groupedHooks = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = hooks.filter((h) => h.category === cat);
      return acc;
    },
    {} as Record<string, Hook[]>
  );

  return (
    <>
      {/* NAV */}
      <nav aria-label="Main navigation">
        <Link className="nav-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </Link>
        <a
          className="nav-cta"
          href="https://tiktoklaunchsystem.lemonsqueezy.com/checkout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Full System →
        </a>
      </nav>

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hg-hero">
          <div className="section-tag" aria-hidden="true">
            Free Tool
          </div>
          <h1 className="hg-headline">
            TIKTOK HOOK
            <br />
            <span className="hg-headline-accent">generator.</span>
          </h1>
          <p className="hg-subheadline">
            20 proven hooks for your app. Generated in seconds. Zero guesswork.
          </p>

          {/* FORM / RESULTS */}
          {!hasGenerated ? (
            <form className="hg-form" onSubmit={handleSubmit} aria-label="Generate TikTok hooks">
              <div className="hg-field">
                <label htmlFor="hg-app-name" className="hg-label">
                  Your app name
                </label>
                <input
                  id="hg-app-name"
                  className="hg-input"
                  type="text"
                  placeholder="e.g. FocusFlow"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="hg-field">
                <label htmlFor="hg-app-niche" className="hg-label">
                  Your app niche
                </label>
                <input
                  id="hg-app-niche"
                  className="hg-input"
                  type="text"
                  placeholder="e.g. fitness, finance, productivity"
                  value={appNiche}
                  onChange={(e) => setAppNiche(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="hg-field">
                <label htmlFor="hg-email" className="hg-label">
                  Your email
                </label>
                <input
                  id="hg-email"
                  className="hg-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                className="btn-primary hg-submit"
                type="submit"
                disabled={loading || cooldown}
                aria-busy={loading}
              >
                {loading ? 'GENERATING...' : 'GENERATE MY HOOKS →'}
              </button>

              {loading && <div className="hg-loading-bar" aria-hidden="true" />}

              {error && (
                <p className="hg-error" role="alert" aria-live="assertive">
                  {error}
                </p>
              )}

              <p className="hg-trust">Join 200+ app founders using TikTok to grow organically</p>
            </form>
          ) : (
            <div className="hg-results">
              {/* RESULTS BY CATEGORY */}
              {CATEGORIES.map((cat) => {
                const catHooks = groupedHooks[cat];
                if (!catHooks || catHooks.length === 0) return null;
                return (
                  <div key={cat} className="hg-category-section">
                    <h2 className="hg-category-title">{CATEGORY_LABELS[cat]}</h2>
                    <div className="hg-hooks-list">
                      {catHooks.map((hook, i) => {
                        const globalIndex = hooks.indexOf(hook);
                        return (
                          <div key={i} className="hg-hook-card">
                            <div className="hg-hook-content">
                              <p className="hg-hook-text">{hook.text}</p>
                              <span className="hg-hook-format">
                                {FORMAT_LABELS[hook.format] || hook.format}
                              </span>
                            </div>
                            <button
                              className="hg-copy-btn"
                              type="button"
                              onClick={() => copyToClipboard(hook.text, globalIndex)}
                            >
                              {copiedIndex === globalIndex ? 'COPIED' : 'COPY'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* UPSELL CTA */}
              <div className="hg-upsell">
                <p className="hg-upsell-text">
                  Want the full system? Account warm-up, VA playbooks, content frameworks.
                </p>
                <a
                  className="btn-primary hg-upsell-btn"
                  href="https://tiktoklaunchsystem.lemonsqueezy.com/checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GET THE FULL SYSTEM — $149
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>

              {/* GENERATE AGAIN */}
              <button className="hg-reset-btn" type="button" onClick={handleReset}>
                ← Generate again
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer role="contentinfo">
        <Link className="footer-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </Link>
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
