'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, Gem } from 'lucide-react';
import { Card, CardContent, Button, WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { useCountdown } from '@/hooks';
import { getPricingInfo, formatPrice, type PricingInfo } from '@/lib';

interface PricingProps {
  onStart: () => void;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary/10 aspect-square w-12 rounded-lg flex items-center justify-center">
        <span className="text-xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

export function Pricing({ onStart }: PricingProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [pricing, setPricing] = useState<PricingInfo | null>(null);

  // Calculate pricing on client only after mount
  useEffect(() => {
    setPricing(getPricingInfo());
    setMounted(true);
  }, []);

  // Use pricing date or a far-future fallback (avoids Date.now() during render)
  const countdownDate = pricing?.nextIncreaseDate ?? new Date('2099-01-01');
  const countdown = useCountdown(countdownDate);

  // Don't show countdown until mounted and pricing is loaded (prevents hydration mismatch)
  const showCountdown = mounted && pricing && !countdown.isExpired;

  return (
    <section id="pricing" className="px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 max-w-xl mx-auto">
        <WavyUnderline>{t.landing.pricing.title}</WavyUnderline>
      </h2>

      <div className="max-w-md mx-auto">
        {/* Countdown Timer - Above the card */}
        {showCountdown && (
          <div className="mb-6 relative">
            {/* Limited Offer badge with arrow */}
            <div className="absolute -right-4 -top-2 md:-right-2">
              {/* Badge */}
              <div className="rotate-12 bg-muted/80 border border-border rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <Gem className="size-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  {t.landing.pricing.badge}
                </span>
              </div>
              {/* Curved arrow */}
              <Image
                src="/misc/arrow.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 absolute top-10 left-19 md:top-8 md:left-8 opacity-70"
              />
            </div>

            <p className="text-sm text-muted-foreground text-center mb-3">
              {t.landing.pricing.countdown.title}
            </p>
            <div className="flex justify-center gap-3">
              <TimeBlock value={countdown.days} label={t.landing.pricing.countdown.days} />
              <TimeBlock value={countdown.hours} label={t.landing.pricing.countdown.hours} />
              <TimeBlock value={countdown.minutes} label={t.landing.pricing.countdown.minutes} />
              <TimeBlock value={countdown.seconds} label={t.landing.pricing.countdown.seconds} />
            </div>
          </div>
        )}

        {/* Card with glow effect */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-primary/30 rounded-3xl blur-xl" />

          {/* Outer Card */}
          <Card className="relative border-0 shadow-2xl rounded-2xl overflow-hidden py-0">
            <CardContent className="p-6">
              {/* Inner Card */}
              <div className="bg-muted/50 rounded-lg p-6 text-center mb-6">
                {/* Plan Title */}
                <h3 className="text-2xl font-bold mb-1">{t.landing.pricing.planTitle}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t.landing.pricing.planSubtitle}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-lg text-muted-foreground line-through mr-2">
                    {formatPrice(pricing?.nextPrice ?? 12)}
                  </span>
                  <span className="text-5xl font-bold">{formatPrice(pricing?.currentPrice ?? 10)}</span>
                </div>

                {/* CTA Button */}
                <Button onClick={onStart} size="lg" className="w-full">
                  {t.landing.pricing.cta}
                </Button>
              </div>

              {/* Benefits list - below inner card */}
              <ul className="space-y-3">
                {t.landing.pricing.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Check className="size-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
