'use client';

import Link from 'next/link';
import { Button, AILogoFlipper, WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { SocialProof } from './SocialProof';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* Sunrise gradient - orange circle at top fading down */}
      <div
        className="absolute inset-x-0 -top-28 bottom-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 py-10 text-center">
      <div className="inline-block mb-10 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground">
        {t.landing.hero.subtext}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="inline-flex items-center justify-center flex-wrap gap-x-3">
          <span>{t.landing.hero.titlePart1}</span>
          <AILogoFlipper />
          <span>{t.landing.hero.titlePart2}</span>
        </span>
        <br />
        {t.landing.hero.titlePart3}<WavyUnderline>{t.landing.hero.titlePart4}</WavyUnderline>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {t.landing.hero.subtitle}
      </p>

      <Button
        onClick={onStart}
        size="lg"
        className="text-lg px-16 py-6 h-auto"
      >
        {t.landing.hero.cta}
      </Button>

      <Link
        href="/restore"
        className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
      >
        {t.landing.hero.restorePurchase}
      </Link>

      <SocialProof />
      </div>
    </div>
  );
}
