import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free TikTok Hook Generator for App Founders | tiklaunch.io',
  description:
    'Generate 20 proven TikTok hooks for your app in seconds. Free AI-powered tool for app founders who want to grow on TikTok without ads.',
  openGraph: {
    title: 'Free TikTok Hook Generator for App Founders',
    description:
      'Generate 20 proven TikTok hooks for your app in seconds. Free AI-powered tool for app founders.',
    url: 'https://tiklaunch.io/tools/hook-generator',
    siteName: 'TikTok Launch System',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TikTok Hook Generator — Free AI Tool for App Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TikTok Hook Generator for App Founders',
    description: 'Generate 20 proven TikTok hooks for your app in seconds. Zero cost. AI-powered.',
    images: ['/opengraph-image'],
  },
};

export default function HookGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
