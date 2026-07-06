import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VORTX Studios | Premium Creative Spaces in Chennai",
    template: "%s | VORTX Studios"
  },
  description: "Chennai's premier creative studio space for podcasts, photography, and video production. Book your professional session today.",
  openGraph: {
    title: "VORTX Studios",
    description: "Chennai's premier creative studio space for podcasts, photography, and video production.",
    url: "https://vortxstudios.com",
    siteName: "VORTX Studios",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VORTX Studios",
    description: "Chennai's premier creative studio space.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
