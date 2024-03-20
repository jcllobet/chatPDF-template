import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { UnifiedChatProvider } from "@/context/chatProvider"; // Import ChatProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SciPhi Search",
  description: "Robust AI Powered Search.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  inject();

  return (
    <UnifiedChatProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
        <SpeedInsights />
        <Analytics />
      </html>
    </UnifiedChatProvider>
  );
}
