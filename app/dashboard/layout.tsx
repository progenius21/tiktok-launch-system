"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/accounts', label: 'Accounts' },
  { href: '/dashboard/hooks', label: 'Hooks' },
  { href: '/dashboard/content', label: 'Content' },
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
        <div>
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
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="dash-sidebar-footer">
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
