import { formatTime } from '@/lib/time';

interface TimerDisplayProps {
  timeLeft: number;
}

/**
 * Displays the remaining time in MM:SS format.
 * Large, centered text with tabular numbers for consistent width.
 */
export function TimerDisplay({ timeLeft }: TimerDisplayProps) {
  return (
    <div className="text-8xl font-bold tabular-nums">
      {formatTime(timeLeft)}
    </div>
  );
}
