'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon } from '@hugeicons/core-free-icons';
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

/** Truncates text to maxLength characters with ellipsis */
function truncateText(text: string, maxLength = 16): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trim() + '…';
}

type SummaryItem = { label: string };

export function PaymentSummary({ answers, onBack, onPayment, onDevSkip }: PaymentSummaryProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const { language, t } = useLanguage();

  // Build summary items for all 8 poll selections
  const getSummaryItems = (): SummaryItem[] => {
    const items: SummaryItem[] = [];
    const pollOptions = t.poll.steps as Record<string, { options: Record<string, string> }>;

    // 1. Language
    items.push({ label: LANGUAGE_NAMES[language] });

    // 2. AI Platform (check for custom)
    const aiPlatform = answers.aiPlatform || 'chatgpt';
    const aiLabel = aiPlatform === 'other' && answers.customAiPlatform
      ? answers.customAiPlatform
      : pollOptions.aiPlatform?.options[aiPlatform] || aiPlatform;
    items.push({ label: aiLabel });

    // 3. Training Type (check for custom)
    const training = answers.trainingType || 'strength';
    const trainingLabel = training === 'other' && answers.customTrainingType
      ? answers.customTrainingType
      : pollOptions.trainingType?.options[training] || training;
    items.push({ label: trainingLabel });

    // 4. Equipment (check for custom)
    const equipment = Array.isArray(answers.equipment) ? answers.equipment[0] : answers.equipment;
    const equipmentValue = equipment || 'home';
    const equipmentLabel = equipmentValue === 'custom' && answers.customEquipment
      ? answers.customEquipment
      : pollOptions.equipment?.options[equipmentValue] || equipmentValue;
    items.push({ label: equipmentLabel });

    // 5. Weight Preference (may be empty if conditional step was skipped)
    const weightPref = answers.weightPreference;
    if (weightPref) {
      const weightLabel = pollOptions.weightPreference?.options[weightPref] || weightPref;
      items.push({ label: weightLabel });
    }

    // 6. Goals (check for custom)
    const goals = Array.isArray(answers.goals) ? answers.goals[0] : answers.goals;
    const goalsValue = goals || 'general';
    const goalsLabel = goalsValue === 'other' && answers.customGoals
      ? answers.customGoals
      : pollOptions.goals?.options[goalsValue] || goalsValue;
    items.push({ label: goalsLabel });

    // 7. Tracker (check for custom, skip if 'none')
    const tracker = answers.tracker;
    if (tracker && tracker !== 'none') {
      const trackerLabel = tracker === 'other' && answers.customTracker
        ? answers.customTracker
        : pollOptions.tracker?.options[tracker] || tracker;
      items.push({ label: trackerLabel });
    }

    // 8. Coaching Style
    const coachingStyle = answers.coachingStyle;
    if (coachingStyle) {
      const coachingLabel = pollOptions.coachingStyle?.options[coachingStyle] || coachingStyle;
      items.push({ label: coachingLabel });
    }

    return items;
  };

  const summaryItems = getSummaryItems();

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <BackButton onClick={onBack} className="mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t.payment.orderReady}
        </h2>
        <div className="space-y-3 mb-5">
          {/* Card 1: Personalized Workouts */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">1</Badge>
                {t.payment.personalizedWorkouts}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {summaryItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={Tick01Icon}
                      className="h-4 w-4 text-primary shrink-0"
                    />
                    <span className="text-sm text-muted-foreground truncate">
                      {truncateText(item.label)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Interactive Workout Timer */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">2</Badge>
                {t.payment.interactiveTimer}
              </CardTitle>
              <CardDescription className="ml-8">
                {t.payment.interactiveTimerDesc}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3: Guides and Support */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">3</Badge>
                {t.payment.guidesSupport}
              </CardTitle>
              <CardDescription className="ml-8">
                {t.payment.guidesDesc}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 4: And that's not all */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">4</Badge>
                {t.payment.andMore}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-4">
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
