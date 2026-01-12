'use client';

import { Card, CardContent, WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';

const AUDIENCE_EMOJIS = ['🤖', '📺', '🏋️'];

export function ForWhom() {
  const { t } = useLanguage();

  return (
    <section id="for-whom" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-30">
        <WavyUnderline>{t.landing.forWhom.title}</WavyUnderline>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {t.landing.forWhom.items.map((item, i) => (
          <Card key={i} className="bg-gradient-to-br from-card to-muted/50 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">{AUDIENCE_EMOJIS[i]}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
