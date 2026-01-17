'use client';

import type { TimerPhase } from '@/types';

interface RoundProgressProps {
  currentRound: number;
  totalRounds: number;
  phase?: TimerPhase;
}

export function RoundProgress({ currentRound, totalRounds, phase }: RoundProgressProps) {
  const isCooldownPhase = phase === 'cooldownCountdown' || phase === 'cooldown';

  return (
    <div className="flex gap-2">
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNumber = i + 1;
        const isCompleted = isCooldownPhase || roundNumber < currentRound;
        const isCurrent = !isCooldownPhase && roundNumber === currentRound;

        return (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${isCompleted
                ? 'bg-white/40'
                : isCurrent
                  ? 'bg-white text-emerald-700'
                  : 'bg-black/20'
              }`}
          >
            {isCompleted ? '✓' : roundNumber}
          </div>
        );
      })}
    </div>
  );
}
