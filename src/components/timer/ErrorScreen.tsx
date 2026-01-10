'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations, detectBrowserLanguage } from '@/i18n';
import type { UrlCorruptionType } from '@/types';

interface ErrorScreenProps {
  onLoadDemo: () => void;
  errorType?: UrlCorruptionType;
}

export function ErrorScreen({ onLoadDemo, errorType }: ErrorScreenProps) {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  // Get specific error info if available
  const specificError = errorType ? t.error.specific[errorType] : null;
  const isGeminiIssue = errorType === 'control_characters' || errorType === 'invalid_utf8';

  // Choose emoji based on error type
  const emoji = errorType === 'truncated' ? '✂️' : '😕';

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-bold mb-2">
            {specificError?.title || t.error.title}
          </h1>
          <p className="text-muted-foreground">
            {specificError?.description || t.error.apology}
          </p>
        </div>

        {/* Specific Fix Suggestion */}
        {specificError?.fix && (
          <Card className="mb-4 bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">💡</span>
                <p className="text-sm">{specificError.fix}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gemini Warning */}
        {isGeminiIssue && (
          <Card className="mb-4 bg-amber-500/10 border-amber-500/30">
            <CardContent className="pt-4">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {t.error.geminiWarning}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Common Reasons - only show for generic errors */}
        {!specificError && (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <h3 className="font-medium mb-2 text-sm">{t.error.commonReasons.title}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.error.commonReasons.badEncoding}</li>
                <li>• {t.error.commonReasons.wrongModel}</li>
                <li>• {t.error.commonReasons.cyrillicIssue}</li>
                <li>• {t.error.commonReasons.truncatedLink}</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Solutions */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <h3 className="font-medium mb-2 text-sm">{t.error.solutions.title}</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>{t.error.solutions.regenerate}</li>
              <li>{t.error.solutions.switchModel}</li>
              <li>{t.error.solutions.useEnglish}</li>
              <li>{t.error.solutions.checkLink}</li>
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={onLoadDemo} size="lg" className="w-full">
            {t.demo.tryDemo}
          </Button>
          <Button variant="link" asChild className="text-muted-foreground">
            <Link href="/instructions/chatgpt">{t.error.viewInstructions}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
