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
  metadataBase: new URL('https://workout-timer.app'),
  title: "Workout Timer | Transforms your workouts in Claude/ChatGPT/Gemini into timer",
  description: "Teach your ChatGPT, Claude, Gemini, Perplexity or Grok to create personalised workouts and turn them into interactive timers.",
  openGraph: {
    title: 'Workout Timer | Transforms your workouts in Claude/ChatGPT/Gemini into timer',
    description: 'Teach your ChatGPT, Claude, Gemini, Perplexity or Grok to create personalised workouts and turn them into interactive timers.',
    url: 'https://workout-timer.app',
    siteName: 'Workout Timer',
    images: [{ url: '/socials/og-image.png', width: 1200, height: 631 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workout Timer | Transforms your workouts in Claude/ChatGPT/Gemini into timer',
    description: 'Teach your ChatGPT, Claude, Gemini, Perplexity or Grok to create personalised workouts and turn them into interactive timers.',
    images: ['/socials/og-image.png'],
  },
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
    <html lang="en" suppressHydrationWarning style={{ background: '#1c1917' }}>
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
