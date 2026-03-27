import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <div className="dash-title">OVERVIEW</div>

      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: 8 }}>
            Active Accounts
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: 8 }}>
            Hooks Generated
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: 8 }}>
            Content Pieces
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: 8 }}>
            Total Views
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
          Quick Actions
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/dashboard/hooks" className="dash-btn-primary" style={{ textDecoration: 'none' }}>
            Generate Hooks
          </Link>
          <Link href="/dashboard/accounts" className="dash-btn-primary" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--border)', color: 'var(--off-white)' }}>
            Add Account
          </Link>
          <Link href="/dashboard/content" className="dash-btn-primary" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--border)', color: 'var(--off-white)' }}>
            New Content
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 60, padding: 32, border: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-grey)', marginBottom: 12 }}>
          Getting Started
        </div>
        <ol style={{ paddingLeft: 20, color: 'var(--warm-grey)', fontSize: 13, lineHeight: 2.2, margin: 0 }}>
          <li>Add your first TikTok account under <Link href="/dashboard/accounts" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Accounts</Link></li>
          <li>Generate hooks for your niche under <Link href="/dashboard/hooks" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Hooks</Link></li>
          <li>Build your content pipeline under <Link href="/dashboard/content" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Content</Link></li>
        </ol>
      </div>
    </div>
  );
}
