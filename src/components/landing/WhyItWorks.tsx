'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n';

const ICONS = ['🎯', '🔄', '📱', '💰'];

export function WhyItWorks() {
  const { t } = useLanguage();

  return (
    <section id="benefits" className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t.landing.benefits.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {t.landing.benefits.items.map((benefit, index) => (
          <Card key={index} className="bg-card/50">
            <CardContent className="pt-6 flex gap-4">
              <div className="text-2xl">{ICONS[index]}</div>
              <div>
                <h3 className="font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
