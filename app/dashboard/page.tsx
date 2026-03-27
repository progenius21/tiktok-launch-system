import Link from 'next/link';

const quickActions = [
  { href: '/dashboard/hooks', label: 'Generate Hooks', primary: true },
  { href: '/dashboard/accounts', label: 'Add Account', primary: false },
  { href: '/dashboard/content', label: 'Create Content', primary: false },
  { href: '/TikTok-Launch-System-Guide.pdf', label: 'Get Guide', primary: false, external: true },
];

const recentActivity = [
  { action: 'Hook generated', detail: 'Finance niche -- 10 hooks', time: '2h ago' },
  { action: 'Account added', detail: '@financeapp_us warm-up day 1', time: '1d ago' },
  { action: 'Content posted', detail: 'Stop wasting money on subscriptions', time: '2d ago' },
];

const warmupAccounts = [
  { username: '@financeapp_us', day: 3, status: 'warming' },
  { username: '@moneytracker_01', day: 1, status: 'warming' },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="dash-title">OVERVIEW</div>

      <div className="dash-stats-grid" aria-label="Stats">
        <div className="dash-stat-card">
          <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            Active Accounts
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            Hooks Generated
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            Content Pieces
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
        <div className="dash-stat-card">
          <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            Total Views
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, color: 'var(--off-white)' }}>
            0
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          Quick Actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'block',
                padding: '20px 24px',
                background: action.primary ? 'var(--accent)' : 'var(--black)',
                color: action.primary ? '#fff' : 'var(--off-white)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'opacity 0.15s',
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* WARMUP STATUS */}
      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          Warmup Tracker
        </div>
        <div style={{ border: '1px solid var(--border)' }}>
          {warmupAccounts.length === 0 ? (
            <div style={{ padding: '32px', color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
              No accounts in warm-up. <Link href="/dashboard/accounts" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Add one to get started.</Link>
            </div>
          ) : (
            warmupAccounts.map((acct, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < warmupAccounts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--off-white)' }}>{acct.username}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Day {acct.day} / 3</span>
                  <span style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent-dim)', padding: '3px 8px', fontFamily: 'var(--font-mono)' }}>
                    {acct.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          Recent Activity
        </div>
        <div style={{ border: '1px solid var(--border)' }}>
          {recentActivity.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--off-white)', marginBottom: 4 }}>{item.action}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{item.detail}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
