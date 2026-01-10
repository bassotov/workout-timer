'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Workout } from '@/types';

interface ReadyScreenTranslations {
  rounds: string;
  min: string;
  cooldown: string;
  start: string;
}

interface ReadyScreenProps {
  workout: Workout;
  totalDuration: number;
  onStart: () => void;
  translations: ReadyScreenTranslations;
}

export function ReadyScreen({ workout, totalDuration, onStart, translations: t }: ReadyScreenProps) {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
      <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>
      <p className="text-muted-foreground mb-4">
        {workout.rounds} {t.rounds} • ~{totalDuration} {t.min}
        {workout.cooldown && ` • + ${t.cooldown.toLowerCase()}`}
      </p>
      <Card className="mb-6 w-full max-w-md">
        <CardContent className="pt-6">
          {workout.exercises.map((ex, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
              <span>{ex.name}</span>
              <span className="text-muted-foreground">
                {ex.weight && ex.weight !== '—' && `${ex.weight} • `}{ex.reps}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button onClick={onStart} size="lg" className="text-xl px-14 py-6 h-auto">
        {t.start}
      </Button>
    </div>
  );
}
