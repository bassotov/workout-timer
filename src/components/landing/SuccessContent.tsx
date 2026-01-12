'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelRecommendations } from '@/components/landing';
import { useLanguage } from '@/i18n';
import { generateInstructions } from '@/lib/instruction-generator';
import { downloadOrShareFile } from '@/lib';
import { AI_CONFIG_KEYS } from '@/config';
import type { PollAnswers } from '@/types';

const TIMER_BASE_URL = 'https://workout-timer.app/timer';

interface SuccessContentProps {
  answers: PollAnswers;
  verified: boolean;
  onStartPoll?: () => void;
}

export function SuccessContent({ answers, verified, onStartPoll }: SuccessContentProps) {
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

  const downloadInstructions = async () => {
    const content = generateInstructions(answers, TIMER_BASE_URL);
    const safeName = answers.name?.replace(/[<>:"/\\|?*]/g, '_').trim() || 'USER';
    const filename = `${safeName}_WORKOUT_INSTRUCTIONS.md`;

    const result = await downloadOrShareFile(content, filename);

    // Only clear localStorage if download/share succeeded
    if (result.success) {
      localStorage.removeItem('workout-poll-answers');
    }
  };

  const getPlatformSteps = (): string[] => {
    const platformKey = platform as keyof typeof t.success.platformSteps;
    return t.success.platformSteps[platformKey] || t.success.platformSteps.other;
  };

  const steps = getPlatformSteps();

  // Non-verified - show helpful options to restore or start fresh
  if (!verified) {
    return (
      <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          {/* Split layout: Already purchased? | Haven't purchased yet? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left column - Already purchased */}
            <div className="text-center p-6 rounded-xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">{t.success.alreadyPurchased}</h2>
              <div className="mb-4">
                <Image
                  src="/screenshots/e-mail/customer-portal.png"
                  alt="Email confirmation screenshot"
                  width={300}
                  height={200}
                  className="rounded-lg border border-border mx-auto max-w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t.success.findEmailInstructions}
              </p>
              <Button variant="secondary" asChild className="w-full">
                <Link href="/restore">{t.success.restoreYourFile}</Link>
              </Button>
            </div>

            {/* Right column - Haven't purchased yet */}
            <div className="text-center p-6 rounded-xl border border-border bg-card flex flex-col">
              <h2 className="text-xl font-bold mb-4">{t.success.notPurchasedYet}</h2>
              <div className="flex-1 flex flex-col items-center justify-center mb-4">
                <div className="text-5xl mb-4">🚀</div>
                <p className="text-muted-foreground">
                  {t.success.takeQuickPoll}
                </p>
              </div>
              <Button className="w-full cursor-pointer" onClick={onStartPoll}>
                {t.success.getStarted}
              </Button>
            </div>
          </div>

          {/* Help section - spans full width */}
          <Card>
            <CardContent className="py-6 text-center">
              <h3 className="text-xl font-bold mb-4">{t.success.needHelp}</h3>
              <Button variant="secondary" asChild className="mb-4">
                <Link href="/getting-started">{t.success.gettingStartedGuide}</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                {t.success.helpText}{' '}
                <a
                  href="mailto:support@workout-timer.app"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  support@workout-timer.app
                </a>
              </p>
            </CardContent>
          </Card>
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
