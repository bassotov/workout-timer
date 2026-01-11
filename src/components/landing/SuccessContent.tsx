'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelRecommendations } from '@/components/landing';
import { useLanguage } from '@/i18n';
import { generateInstructions } from '@/lib/instruction-generator';
import { AI_CONFIG_KEYS } from '@/config';
import type { PollAnswers } from '@/types';

const TIMER_BASE_URL = 'https://workout-timer.app/timer';

interface SuccessContentProps {
  answers: PollAnswers;
  verified: boolean;
}

export function SuccessContent({ answers, verified }: SuccessContentProps) {
  const { t } = useLanguage();
  const platform = answers.aiPlatform || 'chatgpt';
  const hasInstructionPage = AI_CONFIG_KEYS.includes(platform as typeof AI_CONFIG_KEYS[number]);

  // Confetti burst on mount (only for verified purchases)
  useEffect(() => {
    if (!verified) return;

    // Left burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.6 },
    });
    // Right burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.6 },
    });
  }, [verified]);

  const downloadInstructions = () => {
    const content = generateInstructions(answers, TIMER_BASE_URL);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = answers.name?.replace(/[<>:"/\\|?*]/g, '_').trim() || 'USER';
    a.download = `${safeName}_WORKOUT_INSTRUCTIONS.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    localStorage.removeItem('workout-poll-answers');
  };

  const getPlatformSteps = (): string[] => {
    const platformKey = platform as keyof typeof t.success.platformSteps;
    return t.success.platformSteps[platformKey] || t.success.platformSteps.other;
  };

  const steps = getPlatformSteps();

  // Unauthorized access - show "nice try" message
  if (!verified) {
    return (
      <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-4">🧐</div>
          <h2 className="text-2xl font-bold mb-4">{t.success.niceTry}</h2>
          <p className="text-muted-foreground mb-8">
            {t.success.notPurchased}
          </p>
          <Button disabled className="w-full text-lg py-6 h-auto mb-4 opacity-50 cursor-not-allowed">
            📥 {t.success.downloadFile}
          </Button>
          <Button variant="default" asChild className="w-full">
            <Link href="/">
              {t.success.startOver}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">{t.success.allSet}</h2>
        <p className="text-muted-foreground mb-8">
          {t.success.downloadReady}
        </p>
        <Button onClick={downloadInstructions} className="w-full text-lg py-6 h-auto mb-4">
          📥 {t.success.downloadFile}
        </Button>
        {answers.dataConsent === 'discard' ? (
          <div className="mb-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-lg text-sm">
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              ⚠️ {t.success.discardWarning}
            </p>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm">
            <p className="text-muted-foreground">
              {t.success.restoreNote}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadInstructions}
              className="mt-2"
            >
              {t.success.downloadAgain}
            </Button>
          </div>
        )}
        <ModelRecommendations platform={platform as 'chatgpt' | 'claude' | 'gemini' | 'other'} />
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="text-base">{t.success.nextSteps}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              {steps.map((step, i) => <li key={i}>{step}</li>)}
              <li>{t.success.askWorkout}</li>
            </ol>
          </CardContent>
        </Card>
        {hasInstructionPage && (
          <Button variant="secondary" asChild className="w-full mt-4">
            <Link href={`/instructions/${platform}`}>
              {t.success.detailedInstructions}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
