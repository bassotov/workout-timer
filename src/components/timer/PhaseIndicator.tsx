import { Badge } from '@/components/ui/badge';
import type { TimerPhase } from '@/types';

interface Translations {
  work: string;
  rest: string;
  roundRest: string;
  cooldown: string;
  complete: string;
}

interface PhaseIndicatorProps {
  phase: TimerPhase;
  translations: Translations;
}

const phaseToTranslationKey: Record<string, keyof Translations | null> = {
  work: 'work',
  exercise: 'work',
  rest: 'rest',
  roundRest: 'roundRest',
  cooldown: 'cooldown',
  complete: 'complete',
  idle: null,
  tracker: null,
  countdown: null,
};

/**
 * Displays the current phase name as a badge.
 * Shows GET READY, WORK, REST, ROUND REST, COOLDOWN, or COMPLETE.
 */
export function PhaseIndicator({ phase, translations }: PhaseIndicatorProps) {
  const translationKey = phaseToTranslationKey[phase];

  if (!translationKey) {
    return null;
  }

  const phaseLabel = translations[translationKey];

  return (
    <Badge
      variant="secondary"
      className="bg-white/20 text-white border-0"
    >
      {phaseLabel}
    </Badge>
  );
}
