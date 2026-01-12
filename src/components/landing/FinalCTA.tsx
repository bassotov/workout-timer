'use client';

import { Button, WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';

interface FinalCTAProps {
  onStart: () => void;
}

export function FinalCTA({ onStart }: FinalCTAProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <WavyUnderline>{t.landing.finalCTA.title}</WavyUnderline>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          {t.landing.finalCTA.subtitle}
        </p>
        <Button size="lg" onClick={onStart} className="text-lg px-10 py-6 h-auto">
          {t.landing.hero.cta}
        </Button>
      </div>
    </section>
  );
}
