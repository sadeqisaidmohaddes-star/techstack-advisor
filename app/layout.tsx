import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DESCRIPTION =
  "Answer a few questions and get a tailored technology-stack recommendation for any kind of project — web, mobile, data/ML, AI, backend, desktop, games, or CLI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TechStack Advisor",
  description: DESCRIPTION,
  applicationName: "TechStack Advisor",
  openGraph: {
    title: "TechStack Advisor",
    description: DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "TechStack Advisor",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechStack Advisor",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
