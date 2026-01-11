'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link04Icon } from '@hugeicons/core-free-icons';
import { Card, CardContent } from '@/components/ui/card';
import { CopyablePrompt } from '@/components/ui/copyable-prompt';
import { useTranslations, detectBrowserLanguage } from '@/i18n';
import type { UrlCorruptionType } from '@/types';

interface ErrorScreenProps {
  errorType?: UrlCorruptionType;
}

export function ErrorScreen({ errorType }: ErrorScreenProps) {
  const lang = detectBrowserLanguage();
  const t = useTranslations(lang);

  const errorKey = errorType ?? 'unknown';
  const specificError = t.error.specific[errorKey];

  // Choose emoji based on error type
  const emoji = errorType === 'truncated' ? '✂️' : '😕';

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">{emoji}</div>
          <h1 className="text-2xl font-bold">{specificError.title}</h1>
        </div>

        {/* Why this happened */}
        <Card className="mb-5">
          <CardContent className="py-0">
            <h3 className="font-medium text-sm mb-0.5 text-muted-foreground">
              {t.error.whyTitle}
            </h3>
            <p className="text-sm leading-relaxed">{specificError.why}</p>
          </CardContent>
        </Card>

        {/* Fix Steps Title */}
        <h3 className="font-semibold text-sm mb-4">
          🔧 {t.error.fixSteps.title}
        </h3>

        {/* Fix Steps */}
        <div className="space-y-5">
          {/* Step 1: Check setup */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                1
              </span>
              <span className="text-sm font-medium">{t.error.fixSteps.step1Title}</span>
            </div>
            <Link
              href="/instructions/chatgpt"
              className="flex items-center gap-2 w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-primary hover:bg-muted/50 hover:border-border transition-colors"
            >
              <HugeiconsIcon icon={Link04Icon} className="h-4 w-4 shrink-0" />
              <span>{t.error.fixSteps.step1Link}</span>
            </Link>
          </div>

          {/* Step 2: Regenerate with prompt */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                2
              </span>
              <span className="text-sm font-medium">{t.error.fixSteps.step2Title}</span>
            </div>
            <CopyablePrompt text={specificError.prompt} />
          </div>

          {/* Step 3: Use advanced model */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                3
              </span>
              <span className="text-sm font-medium">{t.error.fixSteps.step3Title}</span>
            </div>
            <CopyablePrompt text={t.error.fixSteps.step3Prompt} />
          </div>

          {/* Step 4: Translate to English */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                4
              </span>
              <span className="text-sm font-medium">{t.error.fixSteps.step4Title}</span>
            </div>
            <CopyablePrompt text={t.error.fixSteps.step4Prompt} />
          </div>
        </div>
      </div>
    </div>
  );
}
