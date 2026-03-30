import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tiktok-launch-system.vercel.app"),
  title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
  description:
    "The exact TikTok system used to take apps from invisible to thousands of daily downloads. No ads. No tricks. A repeatable content engine you can hand to a VA.",
  openGraph: {
    title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
    description:
      "The exact TikTok system used to take apps from invisible to thousands of daily downloads. No ads. No tricks. A repeatable content engine you can hand to a VA.",
    url: "https://tiktok-launch-system.vercel.app",
    siteName: "TikTok Launch System",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
    description:
      "0 to 10,000 users. Zero ad spend. The repeatable TikTok system for app founders.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmMono.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <Analytics />

        {/* META PIXEL - replace REPLACE_WITH_META_PIXEL_ID with your actual pixel ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'REPLACE_WITH_META_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=REPLACE_WITH_META_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* TIKTOK PIXEL - replace REPLACE_WITH_TIKTOK_PIXEL_ID with your actual pixel ID */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._n=ttq._n||{};ttq._n[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('REPLACE_WITH_TIKTOK_PIXEL_ID');ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </body>
    </html>
  );
}
