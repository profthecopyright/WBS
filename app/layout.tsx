import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Bridge Services | Professional Bridge Partnerships",
  description: "Boutique professional bridge partnerships, coaching, and tournament support founded by champion Brian Glubok.",
  other: {
    "codex-preview": "development",
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
      <body>{children}</body>
    </html>
  );
}
