'use client';

import { Header, Footer } from '@/components/ui';

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
