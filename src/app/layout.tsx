import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { LanguageProvider, LanguageHtmlUpdater } from "@/i18n";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workout Timer | AI-Powered Personal Trainer",
  description: "Custom workouts in one click. Works with ChatGPT, Claude, Gemini. No subscription. No app to install.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c1917",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <LanguageProvider>
          <LanguageHtmlUpdater />
          {children}
        </LanguageProvider>
        <Analytics/>
      </body>
    </html>
  );
}
