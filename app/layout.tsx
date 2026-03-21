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
  title: "TikTok Launch System — 0 to 10K Users, $0 Ad Spend",
  description:
    "The exact TikTok system used to take apps from invisible to thousands of daily downloads. No ads. No tricks. A repeatable content engine you can hand to a VA.",
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
