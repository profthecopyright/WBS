import type { Metadata } from "next";
import "./globals.css";
import "./refinements.css";
import { SITE_URL, SITE_DESCRIPTION, OrganizationStructuredData } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "World Bridge Services | Bridge Partners, Lessons & Coaching",
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  verification: {
    google: "ENWgBHdO9xBV4snMXuaFccUosv-ijDaWT1W3TYRf4WQ",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><OrganizationStructuredData />{children}</body>
    </html>
  );
}
