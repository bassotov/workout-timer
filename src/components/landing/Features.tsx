'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n';

const ICONS = ['📝', '🤖', '💪'];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t.landing.features.title}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {t.landing.features.steps.map((feature, index) => (
          <Card key={index}>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-3">{ICONS[index]}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
