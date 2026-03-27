"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="dash-sidebar" aria-label="Dashboard navigation">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          <Link href="/" className="nav-logo" style={{ display: 'block', marginBottom: 40 }}>
            TIKTOK<span style={{ color: 'var(--accent)' }}>.</span>LAUNCH
          </Link>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? 'var(--off-white)' : 'var(--text-secondary)',
                    background: isActive ? '#111' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'color 0.2s, background 0.2s',
                    fontFamily: 'var(--font-mono)',
                  }}
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

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
        </div>
      </aside>
      <main className="dash-main" id="main-content">{children}</main>
    </div>
  );
}
