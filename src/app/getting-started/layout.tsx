import type { Metadata } from 'next';
import { Header, Footer } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Getting Started | Workout Timer',
  description: 'Set up Workout Timer with your favourite AI assistant. Step-by-step guides for ChatGPT, Claude, Gemini, Grok, and Perplexity.',
  alternates: {
    canonical: 'https://workout-timer.app/getting-started',
  },
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header variant="internal" />
      {children}
      <Footer />
    </main>
  );
}
