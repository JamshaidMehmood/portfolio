import type { Metadata, Viewport } from "next";
// Self-hosted Geist — no external font request, so no render-blocking
// round-trip to Google Fonts on first paint.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Script from "next/script";
import { themeInitScript } from "@/lib/theme";

const title = "Jamshaid Mehmood — Frontend Engineer";
const description =
  "Frontend engineer building analytics dashboards, reporting platforms and component systems in React, Next.js and Redux — with Django REST, Node/Express, PostgreSQL and MongoDB down the stack, and a WebdriverIO end-to-end suite taken from 257 to 641 tests. Two-plus years on HireStream, a multi-tenant hiring SaaS.";
const url = "https://jamshaid-mehmood.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s — Jamshaid Mehmood",
  },
  description,
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "Redux",
    "Analytics Dashboards",
    "Data Visualisation",
    "TypeScript",
    "Test Automation",
    "WebdriverIO",
    "Playwright",
    "Lahore",
    "Jamshaid Mehmood",
  ],
  authors: [{ name: "Jamshaid Mehmood" }],
  creator: "Jamshaid Mehmood",
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Hoisted into <head> by Next, so the theme is set before paint. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
