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
      <div className="dash-title">HOOK GENERATOR</div>
      <p style={{ color: 'var(--warm-grey)', fontSize: 13, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
        Enter your app niche and generate scroll-stopping hooks under 12 words,
        built for TikTok slide content.
      </p>

      <div className="dash-form">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)' }}>
            App Niche
          </label>
          <input
            className="dash-input"
            type="text"
            placeholder="e.g. productivity app for students"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)' }}>
            Number of Hooks
          </label>
          <div style={{ display: 'flex', gap: 1 }}>
            {([10, 15, 20] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                style={{
                  padding: '10px 24px',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  border: 'none',
                  cursor: 'pointer',
                  background: count === n ? 'var(--accent)' : '#1A1A1A',
                  color: count === n ? '#fff' : 'var(--warm-grey)',
                  transition: 'background 0.15s',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          className="dash-btn-primary"
          onClick={generate}
          disabled={loading || !niche.trim()}
          type="button"
          style={{ alignSelf: 'flex-start' }}
        >
          {loading ? 'Generating...' : 'Generate Hooks'}
        </button>

        {error && (
          <p style={{ fontSize: 12, color: 'var(--accent)', margin: 0 }}>{error}</p>
        )}
      </div>

      {hooks.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
            {hooks.length} Hooks Generated
          </div>
          <div className="hooks-list">
            {hooks.map((hook, i) => (
              <div className="hook-card" key={i}>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--off-white)', margin: 0, flex: 1 }}>
                  {hook}
                </p>
                <button
                  type="button"
                  onClick={() => copyHook(hook, i)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border)',
                    padding: '6px 14px',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: copied === i ? 'var(--accent)' : 'var(--warm-grey)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0,
                    transition: 'color 0.15s',
                  }}
                >
                  {copied === i ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {hooks.length === 0 && !loading && (
        <div className="dash-empty-state">
          <div className="dash-empty-icon">✦</div>
          <div className="dash-empty-text">No hooks yet</div>
          <div className="dash-empty-sub">Enter your niche above and hit Generate</div>
        </div>
      )}
    </div>
  );
}
