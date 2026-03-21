import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Instrument_Serif } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
