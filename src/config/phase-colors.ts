import type { TimerPhase } from '@/types';

export const PHASE_COLORS: Record<TimerPhase, string> = {
  idle: 'bg-slate-800',
  tracker: 'bg-slate-800',
  countdown: 'bg-amber-600',
  work: 'bg-emerald-600',
  rest: 'bg-amber-500',
  roundRest: 'bg-blue-600',
  cooldownCountdown: 'bg-indigo-500',
  cooldown: 'bg-indigo-500',
  complete: 'bg-purple-600',
};
