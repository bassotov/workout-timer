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

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function truncateWeight(weight: string, maxLength = 5): string {
  return weight.length > maxLength ? weight.slice(0, maxLength).trim() : weight;
}

function truncateName(name: string, max = 20): string {
  return name.length > max ? name.slice(0, max).trim() + '...' : name;
}

function cleanReps(reps: string): string {
  return reps.replace(/\s*(for\s+)?each(\s+\w+)?$/i, '').trim();
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
          {workout.exercises.map((ex, i) => {
            const videoUrl = ex.video || `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name)}`;
            return (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-sm">
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity group"
                >
                  <YouTubeIcon className="w-4 h-4 opacity-50 group-hover:opacity-70" />
                  <span className="underline decoration-foreground/30 underline-offset-2">{truncateName(ex.name)}</span>
                </a>
                <span className="text-muted-foreground">
                  {ex.weight && ex.weight !== '—' && `${truncateWeight(ex.weight)} • `}{cleanReps(ex.reps)}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Button onClick={onStart} size="lg" className="text-xl px-14 py-6 h-auto">
        {t.start}
      </Button>
    </div>
  );
}
