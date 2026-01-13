'use client';

import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';
import { CopyablePrompt } from '@/components/ui/copyable-prompt';
import { useTranslations, detectBrowserLanguage } from '@/i18n';
import type { UrlCorruptionType } from '@/types';

interface ErrorScreenProps {
  errorType?: UrlCorruptionType;
}

const ERROR_EMOJIS: Record<UrlCorruptionType, string> = {
  truncated: '✂️',
  invalid_base64: '🔗',
  malformed_json: '📝',
  schema_mismatch: '📋',
  invalid_utf8: '🔤',
  control_characters: '👻',
  unknown: '❓',
};

export function ErrorScreen({ errorType }: ErrorScreenProps) {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  const errorKey = errorType ?? 'unknown';
  const specificError = t.error.specific[errorKey];
  const emoji = ERROR_EMOJIS[errorKey];

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{emoji}</div>
          <h1 className="text-2xl font-bold">{specificError.title}</h1>
        </div>

        {/* Error info + prompt */}
        <Card className="mb-6">
          <CardContent className="py-0">
            <p className="font-medium text-primary mb-2">
              {t.error.copyPromptToFix}
            </p>
            <p className="text-sm mb-4">{specificError.why}</p>
            <CopyablePrompt text={specificError.prompt} />
          </CardContent>
        </Card>

        {/* Troubleshooting link */}
        <Button asChild size="lg" className="w-full">
          <Link href="/getting-started/troubleshooting">
            {t.error.troubleshootingGuide}
          </Link>
        </Button>
      </div>
    </div>
  );
}
