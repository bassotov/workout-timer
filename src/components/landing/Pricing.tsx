'use client';

import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/i18n';

export function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 max-w-xl mx-auto">
        {t.landing.pricing.title}
      </h2>
      <Card className="border-primary/30 shadow-xl max-w-md mx-auto">
        <CardContent className="pt-8 text-center">
          {/* Price */}
          <div className="mb-8">
            <span className="text-2xl text-muted-foreground line-through mr-3">
              {t.landing.pricing.originalPrice}
            </span>
            <span className="text-5xl font-bold">{t.landing.pricing.price}</span>
          </div>

          {/* Benefits list */}
          <ul className="space-y-3 text-left mb-6">
            {t.landing.pricing.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check className="size-5 text-green-500 shrink-0" />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
