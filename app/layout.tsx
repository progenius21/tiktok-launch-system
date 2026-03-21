import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
  description:
    "The proven system app founders use to go from 0 to 10,000 real users through TikTok—without spending a dollar on ads. Includes VPN setup, viral content framework, VA playbook, and community.",
  openGraph: {
    title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
    description:
      "The proven system app founders use to go from 0 to 10,000 real users through TikTok—without spending a dollar on ads.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080810] text-[#f0f0f8]">
        {children}
      </body>
    </html>
  );
}
