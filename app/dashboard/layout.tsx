"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/accounts', label: 'Accounts' },
  { href: '/dashboard/hooks', label: 'Hooks' },
  { href: '/dashboard/content', label: 'Content' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="dash-sidebar">
        <div>
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
                    display: 'block',
                    padding: '12px 16px',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isActive ? 'var(--off-white)' : 'var(--warm-grey)',
                    background: isActive ? '#111' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'color 0.2s, background 0.2s',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div style={{ fontSize: 10, color: 'var(--warm-grey)', letterSpacing: '0.12em' }}>
          v0.1 Alpha
        </div>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  );
}
