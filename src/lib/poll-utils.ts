/**
 * Poll utility functions for calculating visible steps
 */

import { POLL_STEPS } from '@/config';
import type { PollAnswers } from '@/types';

/**
 * Count the total number of visible poll steps based on current answers
 * Excludes conditional steps that don't apply
 */
export function getVisibleSteps(answers: PollAnswers): number {
  return POLL_STEPS.filter(
    (step) => !step.conditional || step.conditional(answers)
  ).length;
}

/**
 * Get the visible step index (0-based) for the current poll step
 * Accounts for skipped conditional steps
 */
export function getVisibleStepIndex(
  pollStep: number,
  answers: PollAnswers
): number {
  let visibleIndex = 0;
  for (let i = 0; i < pollStep; i++) {
    const step = POLL_STEPS[i];
    if (!step.conditional || step.conditional(answers)) {
      visibleIndex++;
    }
  }
  return visibleIndex;
}
