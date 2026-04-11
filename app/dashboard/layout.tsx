"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/hooks', label: 'Hook Generator', badge: 'AI' },
  { href: '/dashboard/accounts', label: 'Accounts' },
  { href: '/dashboard/content', label: 'Content Pipeline' },
];

const resourceItems = [
  { href: '/TikTok-Launch-System-Guide.pdf', label: 'Download Guide', external: true },
  { href: 'https://t.me/+Rmp0w4E4y0ZiNDU8', label: 'Telegram Group', external: true },
  { href: '/dashboard/settings', label: 'Settings', external: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="dash-sidebar" role="complementary" aria-label="Dashboard sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          <Link href="/" className="nav-logo" style={{ display: 'block', marginBottom: 40 }} aria-label="TikTok Launch System — Home">
            TIKTOK<span style={{ color: 'var(--accent)' }} aria-hidden="true">.</span>LAUNCH
          </Link>

          <nav className="dash-nav" aria-label="Dashboard navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`dash-nav-link${isActive ? ' active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {item.badge && (
                    <span style={{
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      background: 'var(--accent)',
                      color: '#fff',
                      padding: '2px 6px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 16, fontFamily: 'var(--font-mono)' }}>
              Resources
            </div>
            {resourceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  transition: 'color 0.2s',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="dash-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 32,
              height: 32,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 500,
              color: '#fff',
              flexShrink: 0,
            }}>
              MO
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--off-white)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>Matt Olapo</div>
              <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Pro Plan</div>
            </div>
          </div>
          <button
            type="button"
            className="dash-signout-btn"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <span className="dash-version" aria-label="Version 0.1 Alpha">v0.1 Alpha</span>
        </div>
      </aside>
      <main className="dash-main" id="main-content">{children}</main>
    </div>
  );
}
