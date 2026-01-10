'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, detectBrowserLanguage } from '@/i18n';

interface DemoScreenProps {
  onLoadDemo: () => void;
}

export function DemoScreen({ onLoadDemo }: DemoScreenProps) {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="text-6xl mb-6">⏱️</div>
      <h1 className="text-3xl font-bold mb-2 text-center">{t.demo.title}</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {t.demo.description}
      </p>
      <Card className="mb-6 max-w-md w-full">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-2">{t.demo.examplePrompt}</p>
          <p className="text-sm italic text-foreground/70">
            &quot;{t.demo.exampleText}&quot;
          </p>
        </CardContent>
      </Card>
      <Button onClick={onLoadDemo} size="lg">
        {t.demo.tryDemo}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        {t.demo.includes}
      </p>
      <div className="mt-8 text-muted-foreground text-sm">
        <p>{t.demo.urlFormat} <code className="bg-secondary px-2 py-1 rounded text-xs">?w=BASE64_JSON</code></p>
      </div>
    </div>
  );
}
