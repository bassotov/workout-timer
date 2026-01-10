import type { TimerPhase } from '@/types';

interface Translations {
  work: string;
  rest: string;
  roundRest: string;
  cooldown: string;
  complete: string;
  countdown: string;
}

interface PhaseIndicatorProps {
  phase: TimerPhase;
  translations: Translations;
}

const PHASE_EMOJIS: Record<string, string> = {
  work: '💪',
  exercise: '💪',
  countdown: '🔥',
  rest: '😮‍💨',
  roundRest: '😮‍💨',
  cooldown: '🧘',
  complete: '🎉',
};

const phaseToTranslationKey: Record<string, keyof Translations | null> = {
  work: 'work',
  exercise: 'work',
  rest: 'rest',
  roundRest: 'roundRest',
  cooldown: 'cooldown',
  complete: 'complete',
  countdown: 'countdown',
  idle: null,
  tracker: null,
};

/**
 * Displays the current phase name with emoji.
 * Shows GET READY, WORK, REST, COOLDOWN, or COMPLETE with contextual emoji.
 */
export function PhaseIndicator({ phase, translations }: PhaseIndicatorProps) {
  const translationKey = phaseToTranslationKey[phase];

  if (!translationKey) {
    return null;
  }

  const phaseLabel = translations[translationKey];
  const emoji = PHASE_EMOJIS[phase] || '';

  return (
    <div className="flex items-center gap-2 text-white">
      <span className="text-2xl">{emoji}</span>
      <span className="text-xl font-bold tracking-wide">{phaseLabel}</span>
    </div>
  );
}
