'use client';

import { Button } from '@/components/ui/button';

interface CompletionScreenTranslations {
  greatWork: string;
  workoutComplete: string;
  startAgain: string;
  newWorkout: string;
}

interface CompletionScreenProps {
  workoutName: string;
  onStartAgain: () => void;
  onNewWorkout: () => void;
  translations: CompletionScreenTranslations;
}

export function CompletionScreen({
  workoutName,
  onStartAgain,
  onNewWorkout,
  translations: t,
}: CompletionScreenProps) {
  return (
    <div className="min-h-dvh bg-purple-600 flex flex-col items-center justify-center p-6 safe-area-inset text-white">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-bold mb-4">{t.greatWork}</h1>
      <p className="text-xl mb-8 opacity-90">
        {workoutName} {t.workoutComplete}
      </p>

      <div className="flex flex-col gap-3">
        <Button
          onClick={onStartAgain}
          variant="secondary"
          size="lg"
          className="bg-white/20 hover:bg-white/30 border-0 text-white"
        >
          {t.startAgain}
        </Button>
        <Button
          onClick={onNewWorkout}
          variant="secondary"
          size="lg"
          className="bg-black/20 hover:bg-black/30 border-0 text-white"
        >
          {t.newWorkout}
        </Button>
      </div>
    </div>
  );
}
