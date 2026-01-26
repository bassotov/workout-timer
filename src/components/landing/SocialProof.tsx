'use client';

import { Star } from 'lucide-react';
import { useLanguage } from '@/i18n';

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 mt-8">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="size-5 fill-primary text-primary"
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{t.landing.socialProof.rating}</span>{' '}
        {t.landing.socialProof.text}
      </span>
    </div>
  );
}
