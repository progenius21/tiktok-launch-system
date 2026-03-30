import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="dash-title">OVERVIEW</h1>

      <div className="dash-stats-grid" role="list" aria-label="Dashboard statistics">
        <div className="dash-stat-card" role="listitem">
          <div className="dash-stat-label">Active Accounts</div>
          <div className="dash-stat-num" aria-label="0 active accounts">0</div>
        </div>
        <div className="dash-stat-card" role="listitem">
          <div className="dash-stat-label">Hooks Generated</div>
          <div className="dash-stat-num" aria-label="0 hooks generated">0</div>
        </div>
        <div className="dash-stat-card" role="listitem">
          <div className="dash-stat-label">Content Pieces</div>
          <div className="dash-stat-num" aria-label="0 content pieces">0</div>
        </div>
        <div className="dash-stat-card" role="listitem">
          <div className="dash-stat-label">Total Views</div>
          <div className="dash-stat-num" aria-label="0 total views">0</div>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 className="dash-section-tag">Quick Actions</h2>
        <div className="dash-actions" role="group" aria-label="Quick actions">
          <Link href="/dashboard/hooks" className="dash-btn-primary" style={{ textDecoration: 'none' }}>
            Generate Hooks
          </Link>
          <Link href="/dashboard/accounts" className="dash-btn-outline">
            Add Account
          </Link>
          <Link href="/dashboard/content" className="dash-btn-outline">
            New Content
          </Link>
        </div>
      </div>

      <div className="dash-getting-started">
        <h2 className="dash-getting-started-label">Getting Started</h2>
        <ol>
          <li>Add your first TikTok account under <Link href="/dashboard/accounts">Accounts</Link></li>
          <li>Generate hooks for your niche under <Link href="/dashboard/hooks">Hooks</Link></li>
          <li>Build your content pipeline under <Link href="/dashboard/content">Content</Link></li>
        </ol>
      </div>
    </div>
  );
}
