"use client";

import { useState } from 'react';

export default function HooksPage() {
  const [niche, setNiche] = useState('');
  const [count, setCount] = useState<10 | 15 | 20>(10);
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    if (!niche.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche.trim(), count }),
      });
      const data = await res.json();
      if (data.hooks) {
        setHooks(data.hooks);
      } else {
        setError(data.error || 'Failed to generate hooks');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyHook(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <h1 className="dash-title">HOOK GENERATOR</h1>
      <p className="dash-page-desc">
        Enter your app niche and generate scroll-stopping hooks under 12 words,
        built for TikTok slide content.
      </p>

      <form
        className="dash-form"
        onSubmit={(e) => { e.preventDefault(); generate(); }}
        aria-label="Hook generator"
      >
        <div className="login-field">
          <label className="login-label" htmlFor="app-niche">
            App Niche
          </label>
          <input
            id="app-niche"
            className="dash-input"
            type="text"
            placeholder="e.g. productivity app for students"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            aria-describedby={error ? "hooks-error" : undefined}
          />
        </div>

        <fieldset className="hooks-fieldset">
          <legend className="login-label">Number of Hooks</legend>
          <div className="hooks-count-group">
            {([10, 15, 20] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className={`hooks-count-btn${count === n ? ' active' : ''}`}
                aria-pressed={count === n}
              >
                {n}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          className="dash-btn-primary"
          type="submit"
          disabled={loading || !niche.trim()}
          style={{ alignSelf: 'flex-start' }}
          aria-busy={loading}
        >
          {loading ? 'Generating...' : 'Generate Hooks'}
        </button>

        {error && (
          <p
            id="hooks-error"
            role="alert"
            aria-live="assertive"
            className="login-error"
          >
            {error}
          </p>
        )}
      </form>

      {hooks.length > 0 && (
        <div style={{ marginTop: 48 }} role="region" aria-label="Generated hooks" aria-live="polite">
          <div className="dash-section-tag">
            {hooks.length} Hooks Generated
          </div>
          <ul className="hooks-list" aria-label="Generated hooks list">
            {hooks.map((hook, i) => (
              <li className="hook-card" key={i}>
                <p className="hook-text">
                  {hook}
                </p>
                <button
                  type="button"
                  onClick={() => copyHook(hook, i)}
                  className="hook-copy-btn"
                  aria-label={copied === i ? `Copied: ${hook}` : `Copy hook: ${hook}`}
                >
                  {copied === i ? 'Copied' : 'Copy'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hooks.length === 0 && !loading && (
        <div className="dash-empty-state" aria-label="No hooks generated yet">
          <div className="dash-empty-icon" aria-hidden="true">✦</div>
          <div className="dash-empty-text">No hooks yet</div>
          <div className="dash-empty-sub">Enter your niche above and hit Generate</div>
        </div>
      )}
    </div>
  );
}
