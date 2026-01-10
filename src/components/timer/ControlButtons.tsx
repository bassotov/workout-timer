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

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z" />
    </svg>
  );
}

function SkipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M5 4.14v15.72a1 1 0 0 0 1.5.86l10-7.86a1 1 0 0 0 0-1.72l-10-7.86A1 1 0 0 0 5 4.14z" />
      <rect x="17" y="4" width="3" height="16" rx="1" />
    </svg>
  );
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
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <Button
          onClick={isPaused ? onResume : onPause}
          variant="secondary"
          size="lg"
          className="bg-white/20 hover:bg-white/30 border-0 text-white h-14 text-base"
        >
          {isPaused ? <PlayIcon className="mr-2" /> : <PauseIcon className="mr-2" />}
          {isPaused ? t.resume : t.pause}
        </Button>
        <Button
          onClick={onSkip}
          variant="secondary"
          size="lg"
          className="bg-black/20 hover:bg-black/30 border-0 text-white h-14 text-base"
        >
          {t.skip}
          <SkipIcon className="ml-2" />
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
