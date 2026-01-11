'use client';

import { useLanguage } from '@/i18n';

interface SocialProofProps {
  count?: number;
}

export function SocialProof({ count = 5 }: SocialProofProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <div className="flex -space-x-3">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="size-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-primary/10"
            style={{ zIndex: count - i }}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {count} {t.landing.socialProof.text}
      </span>
    </div>
  );
}
