'use client';

import { Button, AILogoFlipper } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { SocialProof } from './SocialProof';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 inline-flex items-center justify-center flex-wrap gap-x-3">
        <span>{t.landing.hero.titlePart1}</span>
        <AILogoFlipper />
        <span>{t.landing.hero.titlePart2}</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {t.landing.hero.subtitle}
      </p>

      <Button
        onClick={onStart}
        size="lg"
        className="text-lg px-10 py-6 h-auto"
      >
        {t.landing.hero.cta}
      </Button>

      <p className="mt-4 text-muted-foreground text-sm">
        {t.landing.hero.subtext}
      </p>

      <SocialProof />
    </div>
  );
}
