'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/i18n';
import { generateInstructions } from '@/lib/instruction-generator';
import type { PollAnswers } from '@/types';

const TIMER_BASE_URL = 'https://workout-timer.app/timer';

interface SuccessContentProps {
  answers: PollAnswers;
}

export function SuccessContent({ answers }: SuccessContentProps) {
  const { t } = useLanguage();
  const platform = answers.aiPlatform || 'chatgpt';

  const downloadInstructions = () => {
    const content = generateInstructions(answers, TIMER_BASE_URL);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = answers.name?.replace(/[^a-zA-ZА-Яа-яЁё0-9]/g, '_').toUpperCase() || 'USER';
    a.download = `${safeName}_WORKOUT_INSTRUCTIONS.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    localStorage.removeItem('workout-poll-answers');
  };

  // Get platform steps from translations
  const getPlatformSteps = (): string[] => {
    const platformKey = platform as keyof typeof t.success.platformSteps;
    return t.success.platformSteps[platformKey] || t.success.platformSteps.other;
  };

  const steps = getPlatformSteps();

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
        <Card className="text-left mb-6">
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
        <Button variant="link" asChild>
          <a href="/timer">→ {t.success.openTimer}</a>
        </Button>
      </div>
    </div>
  );
}
