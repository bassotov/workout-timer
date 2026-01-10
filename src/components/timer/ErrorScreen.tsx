'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, detectBrowserLanguage } from '@/i18n';

interface ErrorScreenProps {
  onLoadDemo: () => void;
}

export function ErrorScreen({ onLoadDemo }: ErrorScreenProps) {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="text-6xl mb-6">😕</div>
      <h1 className="text-3xl font-bold mb-2 text-center">{t.error.title}</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {t.error.description}
      </p>
      <Card className="mb-6 max-w-md w-full">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-2">{t.error.hint}</p>
          <p className="text-sm text-foreground/70">
            {t.error.suggestion}
          </p>
        </CardContent>
      </Card>
      <Button onClick={onLoadDemo} size="lg">
        {t.demo.tryDemo}
      </Button>
    </div>
  );
}
