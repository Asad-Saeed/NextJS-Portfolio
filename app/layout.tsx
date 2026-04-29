import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/lib/providers/theme-provider";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

// Trim font weights to the only ones used by the design system (400/500/600).
// Drops ~40% of font payload vs loading all weights.
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "A personal portfolio platform",
  openGraph: {
    siteName: "Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Supabase storage so profile/banner/project images
            negotiate TLS in parallel with HTML download — saves ~100-200ms
            on the LCP image fetch on mobile. */}
        <link
          rel="preconnect"
          href="https://xyufrjjbhqndxfxbxcut.supabase.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://xyufrjjbhqndxfxbxcut.supabase.co" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
