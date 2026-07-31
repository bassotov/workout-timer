'use client';

import { useState, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon, PlayIcon } from '@hugeicons/core-free-icons';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/back-button';
import { useLanguage, LANGUAGE_NAMES } from '@/i18n';
import { usePricing } from '@/hooks';
import { formatPrice } from '@/lib';
import type { PollAnswers } from '@/types';

interface PaymentSummaryProps {
  answers: PollAnswers;
  onBack: () => void;
  onPayment: () => Promise<void>;
}

/** Extracts title from "Title.Subtitle" format, returns just the title */
function extractTitle(text: string): string {
  const dotIndex = text.indexOf('.');
  return dotIndex === -1 ? text : text.substring(0, dotIndex);
}

/** Truncates text to maxLength characters with ellipsis */
function truncateText(text: string, maxLength = 16): string {
  const title = extractTitle(text);
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength - 1).trim() + '…';
}

type SummaryItem = { label: string };

export function PaymentSummary({ answers, onBack, onPayment }: PaymentSummaryProps) {
  const { language, t } = useLanguage();
  const { pricing } = usePricing();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMobileVideo, setShowMobileVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const openMobileVideo = () => {
    setShowMobileVideo(true);
    // Try to play after modal opens
    setTimeout(() => {
      mobileVideoRef.current?.play();
    }, 100);
  };

  const closeMobileVideo = () => {
    mobileVideoRef.current?.pause();
    setShowMobileVideo(false);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await onPayment();
    } catch {
      setIsLoading(false);
    }
    // Don't reset loading on success - page will redirect
  };

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

    // 4. Equipment
    const equipment = Array.isArray(answers.equipment) ? answers.equipment[0] : answers.equipment;
    const equipmentValue = equipment || 'home';
    const equipmentLabel = pollOptions.equipment?.options[equipmentValue] || equipmentValue;
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
      <div className="w-full max-w-4xl">
        <BackButton onClick={onBack} className="mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t.payment.orderReady}
        </h2>

        {/* Two-column layout: Cards left, Video right */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 md:ml-15">
          {/* Left column: Feature cards */}
          <div className="md:max-w-sm space-y-3">
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

            {/* Card 3: And that's not all */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">3</Badge>
                  {t.payment.andMore}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-4">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t.payment.lifetimeFeatures}</li>
                  <li>• {t.payment.installationGuide}</li>
                  <li>• {t.payment.customerSupport}</li>
                  <li>• {t.payment.discounts}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Mobile: Demo button */}
            <button
              onClick={openMobileVideo}
              className="md:hidden w-full py-3 px-4 rounded-lg border border-primary text-primary font-medium text-sm flex items-center justify-center gap-2"
            >
              <HugeiconsIcon icon={PlayIcon} className="w-5 h-5" />
              {t.payment.seeDemo}
            </button>
          </div>

          {/* Right column: Demo video (desktop only) */}
          <div className="hidden md:flex flex-col items-start">
            <div
              className="relative cursor-pointer"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                loop
                playsInline
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
                className="h-[320px] md:h-[550px] w-auto rounded-2xl shadow-xl"
              >
                <source src="/demo/checkout_demo.mp4" type="video/mp4" />
              </video>
              {/* Play button overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <HugeiconsIcon icon={PlayIcon} className="w-7 h-7 text-black ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout section */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <p className="text-lg">
              {pricing.isOfferActive && (
                <>
                  <span className="text-muted-foreground line-through">{formatPrice(pricing.standardPrice)}</span>{' '}
                </>
              )}
              <span className="text-4xl font-bold text-primary">{formatPrice(pricing.currentPrice)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {t.payment.lifetimeNoSub}
            </p>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full text-lg py-6 h-auto mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t.payment.processing}
              </>
            ) : (
              t.payment.checkout
            )}
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            {t.payment.securePolar}
          </p>
        </div>
      </div>

      {/* Mobile fullscreen video modal */}
      {showMobileVideo && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeMobileVideo}
        >
          <button
            onClick={closeMobileVideo}
            className="absolute top-4 right-4 text-white text-2xl font-bold z-10 w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>
          <video
            ref={mobileVideoRef}
            controls
            playsInline
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <source src="/demo/checkout_demo.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
