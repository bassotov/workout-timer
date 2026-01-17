'use client';

import Image from 'next/image';
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
          background:
            'radial-gradient(ellipse 100% 90% at 50% 10%, rgba(251, 146, 60, 0.15) 0%, transparent 90%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:pl-16 py-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
          {/* Left: Text content */}
          <div className="md:ml-15 text-center lg:text-left flex-1 min-w-0 max-w-[700]">
            <div className="inline-block mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground">
              {t.landing.hero.subtext}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="inline-flex items-center justify-center lg:justify-start flex-wrap gap-x-3">
                <span>{t.landing.hero.titlePart1}</span>
                <AILogoFlipper />
                <span className="ml-0.5 md:ml-2">{t.landing.hero.titlePart2}</span>
              </span>
              <br />
              <span>{t.landing.hero.titlePart3}</span>
              <WavyUnderline>{t.landing.hero.titlePart4}</WavyUnderline>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none">
              {t.landing.hero.subtitle}
            </p>

            <Button onClick={onStart} size="lg" className="text-lg px-16 py-6 h-auto">
              {t.landing.hero.cta}
            </Button>

            <Link
              href="/restore"
              className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              {t.landing.hero.restorePurchase}
            </Link>

            <SocialProof/>
          </div>

          {/* Right: iPhone mockup */}
          <div className="hidden lg:block relative flex-shrink-0">
            <div className="relative animate-float">
              <Image
                src="/demo/workout-timer-iphone.png"
                alt="Workout Timer app running on iPhone"
                width={400}
                height={800}
                className="w-auto h-[450px] lg:h-[620px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
