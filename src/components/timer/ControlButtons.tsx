'use client';

import { Button } from '@/components/ui/button';

interface ControlButtonsTranslations {
  pause: string;
  resume: string;
  skip: string;
  reset: string;
}

interface ControlButtonsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onReset?: () => void;
  translations: ControlButtonsTranslations;
}

export function ControlButtons({
  isPaused,
  onPause,
  onResume,
  onSkip,
  onReset,
  translations: t,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button
          onClick={isPaused ? onResume : onPause}
          variant="secondary"
          size="lg"
          className="bg-white/20 hover:bg-white/30 border-0 text-white"
        >
          {isPaused ? t.resume : t.pause}
        </Button>
        <Button
          onClick={onSkip}
          variant="secondary"
          size="lg"
          className="bg-black/20 hover:bg-black/30 border-0 text-white"
        >
          {t.skip}
        </Button>
      </div>
      {onReset && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-white/40 hover:text-white hover:bg-transparent"
        >
          {t.reset}
        </Button>
      )}
    </div>
  );
}
