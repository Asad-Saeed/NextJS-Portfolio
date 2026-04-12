import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import QueryProvider from "@/lib/providers/query-provider";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
