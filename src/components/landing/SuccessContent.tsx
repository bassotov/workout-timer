'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/i18n';
import { generateInstructions } from '@/lib/instruction-generator';
import { downloadOrShareFile, setStoredValue, STORAGE_KEYS } from '@/lib';
import type { PollAnswers } from '@/types';

const TIMER_BASE_URL = 'https://workout-timer.app/timer';

interface SuccessContentProps {
  answers: PollAnswers;
  verified: boolean;
  onStartPoll?: () => void;
}

// Check if answers contain personalized data (not just defaults)
function hasPersonalizedData(answers: PollAnswers): boolean {
  // At minimum, user should have name and aiPlatform from the poll flow
  return !!(answers.name && answers.aiPlatform);
}

export function SuccessContent({ answers, verified, onStartPoll }: SuccessContentProps) {
  const { t } = useLanguage();
  const platform = answers.aiPlatform || 'chatgpt';

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
    // Defensive check: ensure we have personalized data before downloading
    if (!hasPersonalizedData(answers)) {
      // Data is missing - redirect to restore flow
      window.location.href = '/restore';
      return;
    }

    const content = generateInstructions(answers, TIMER_BASE_URL);
    const safeName = answers.name?.replace(/[<>:"/\\|?*]/g, '_').trim() || 'USER';
    const filename = `${safeName}_WORKOUT_INSTRUCTIONS.md`;

    const result = await downloadOrShareFile(content, filename);

    // Mark download as completed - poll answers will be cleared after grace period
    // This allows users to refresh and re-download within 48 hours
    if (result.success) {
      setStoredValue(STORAGE_KEYS.DOWNLOAD_COMPLETED, { timestamp: Date.now() });
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
        {answers.dataConsent === 'discard' && (
          <div className="mb-6 p-3 bg-amber-500/15 border border-amber-500/30 rounded-lg text-sm">
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              ⚠️ {t.success.discardWarning}
            </p>
          </div>
        )}
        <Button onClick={downloadInstructions} className="w-full text-lg py-6 h-auto mb-3">
          📥 {t.success.downloadFile}
        </Button>
        <Button variant="secondary" asChild className="w-full text-lg py-6 h-auto mb-6">
          <Link href="/getting-started">
            {t.success.installGuide}
          </Link>
        </Button>
        <Card className="text-left mb-6">
          <CardHeader className="-mb-5">
            <CardTitle className="text-base">{t.success.nextSteps}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              {steps.map((step, i) => <li key={i}>{step}</li>)}
              <li>{t.success.askWorkout}</li>
            </ol>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          {t.success.contactHelp}{' '}
          <a
            href="mailto:support@workout-timer.app"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            support@workout-timer.app
          </a>
        </p>
      </div>
    </div>
  );
}
