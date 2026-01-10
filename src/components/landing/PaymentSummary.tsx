'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/back-button';
import { useLanguage, LANGUAGE_NAMES } from '@/i18n';
import type { PollAnswers } from '@/types';

interface PaymentSummaryProps {
  answers: PollAnswers;
  onBack: () => void;
  onPayment: () => void;
  onDevSkip?: () => void;
}

export function PaymentSummary({ answers, onBack, onPayment, onDevSkip }: PaymentSummaryProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const { language, t } = useLanguage();

  const equipment = (Array.isArray(answers.equipment) ? answers.equipment[0] : answers.equipment) || 'home';
  const training = answers.trainingType || 'strength';
  const goal = (Array.isArray(answers.goals) ? answers.goals[0] : answers.goals) || 'general';
  const tracker = answers.tracker || 'none';
  const platform = answers.aiPlatform || 'chatgpt';

  // Get tag labels from translations
  const getTag = (key: string): string => {
    const tags = t.payment.tags as Record<string, string>;
    return tags[key] || key;
  };

  // Get platform name from poll translations
  const getPlatform = (key: string): string => {
    const options = t.poll.steps.aiPlatform.options as Record<string, string>;
    return options[key] || key;
  };

  const tags = [
    { label: getPlatform(platform), icon: '🤖' },
    { label: getTag(equipment), icon: '🏠' },
    { label: getTag(training), icon: '💪' },
    { label: getTag(goal), icon: '🎯' },
    tracker !== 'none' && { label: getTag(tracker), icon: '⌚' },
    { label: LANGUAGE_NAMES[language], icon: '🌐' },
  ].filter(Boolean) as { label: string; icon: string }[];

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <BackButton onClick={onBack} className="mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">
            {t.payment.orderReady}
          </h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">1</Badge>
                {t.payment.personalizedTimer}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                {tags.map((tag, i) => (
                  <div key={i} className="bg-secondary rounded-lg p-2 text-center">
                    <div className="text-lg">{tag.icon}</div>
                    <div className="text-xs text-secondary-foreground">{tag.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">2</Badge>
                {t.payment.stepByStep}
              </CardTitle>
              <CardDescription className="ml-8">
                {t.payment.stepByStepDesc}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">3</Badge>
                {t.payment.moreValue}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.payment.lifetimeFeatures}</li>
                <li>• {t.payment.discounts}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mb-6">
          <p className="text-lg">
            <span className="text-muted-foreground line-through">$25</span>{' '}
            <span className="text-2xl font-bold text-primary">$10</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {t.payment.lifetimeNoSub}
          </p>
        </div>
        <Button onClick={onPayment} className="w-full text-lg py-6 h-auto mb-4">
          {t.payment.checkout}
        </Button>
        <p className="text-muted-foreground text-sm text-center">
          {t.payment.securePolar}
        </p>
        {isDev && onDevSkip && (
          <Button
            variant="outline"
            onClick={onDevSkip}
            className="mt-4 w-full border-dashed border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          >
            [DEV] Skip Payment
          </Button>
        )}
      </div>
    </div>
  );
}
