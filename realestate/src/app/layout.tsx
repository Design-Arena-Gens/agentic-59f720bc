import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aawas Nepal | Real Estate for Terai, Pahad & Himal",
  description:
    "Discover, list, and verify Nepalese properties with immersive visuals, secure KYC, and real-time support chat tailored for the Terai, Pahad, and Himal regions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AppProviders>
          <div className="relative flex min-h-dvh flex-col bg-background">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
