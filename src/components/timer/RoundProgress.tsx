'use client';

interface RoundProgressProps {
  currentRound: number;
  totalRounds: number;
}

export function RoundProgress({ currentRound, totalRounds }: RoundProgressProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNumber = i + 1;
        const isCompleted = roundNumber < currentRound;
        const isCurrent = roundNumber === currentRound;

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
