import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <div className="dash-title">OVERVIEW</div>

      <div className="dash-stats-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-label">Active Accounts</div>
          <div className="dash-stat-num">0</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Hooks Generated</div>
          <div className="dash-stat-num">0</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Content Pieces</div>
          <div className="dash-stat-num">0</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Total Views</div>
          <div className="dash-stat-num">0</div>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="dash-section-tag">Quick Actions</div>
        <div className="dash-actions">
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
        <div className="dash-getting-started-label">Getting Started</div>
        <ol>
          <li>Add your first TikTok account under <Link href="/dashboard/accounts">Accounts</Link></li>
          <li>Generate hooks for your niche under <Link href="/dashboard/hooks">Hooks</Link></li>
          <li>Build your content pipeline under <Link href="/dashboard/content">Content</Link></li>
        </ol>
      </div>
    </div>
  );
}
