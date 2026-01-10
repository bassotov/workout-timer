'use client';

import { useTranslations, detectBrowserLanguage } from '@/i18n';

export function LoadingScreen() {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="text-6xl mb-6 animate-pulse">⏱️</div>
      <p className="text-muted-foreground">{t.timer.loading}</p>
    </div>
  );
}
