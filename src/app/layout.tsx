import type { Metadata, Viewport } from "next";
// Self-hosted Geist — no external font request, so no render-blocking
// round-trip to Google Fonts on first paint.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const title = "Jamshaid Mehmood — Frontend Engineer";
const description =
  "Frontend engineer building analytics dashboards, reporting platforms and component systems in React, Next.js and Redux — with Django REST, Node/Express, PostgreSQL and MongoDB down the stack. Two years on HireStream, a multi-tenant hiring SaaS.";
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
  themeColor: "#07080a",
  colorScheme: "dark",
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
    >
      <body className="flex min-h-full flex-col">
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
