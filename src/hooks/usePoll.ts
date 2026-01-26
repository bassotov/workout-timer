'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PollAnswers } from '@/types';
import { POLL_STEPS, type PollStep } from '@/config';
import { getStoredValueWithTTL, setStoredValueWithTTL, STORAGE_KEYS, STORAGE_TTL } from '@/lib';

type Page = 'landing' | 'poll' | 'details' | 'payment' | 'success';

const DEFAULT_ANSWERS: PollAnswers = {
  // Core poll answers
  language: 'en', // Always English for instructions
  aiPlatform: '',
  trainingType: '',
  equipment: '',
  weightPreference: '',
  goals: '',
  tracker: '',
  coachingStyle: '',

  // Personal details
  name: '',
  email: '',
  limitations: '',

  // Optional fields (undefined by default)
  gender: undefined,
  weight: undefined,
  height: undefined,
  birthYear: undefined,
  customGuidelines: undefined,

  // Custom "other" inputs
  customEquipment: undefined,
  customAiPlatform: undefined,
  customTracker: undefined,
  customTrainingType: undefined,
  customGoals: undefined,

  // Consent
  dataConsent: undefined,
};

// Find the first valid step (one that passes conditional check)
function getFirstValidStep(answers: PollAnswers): number {
  for (let i = 0; i < POLL_STEPS.length; i++) {
    const step = POLL_STEPS[i];
    if (!step.conditional || step.conditional(answers)) {
      return i;
    }
  }
  return 0;
}

export function usePoll() {
  const [page, setPage] = useState<Page>('landing');
  // Initialize with defaults for SSR consistency - hydrate from localStorage in useEffect
  const [answers, setAnswers] = useState<PollAnswers>(DEFAULT_ANSWERS);
  const [pollStep, setPollStep] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from localStorage after mount (fixes SSR/hydration mismatch)
  useEffect(() => {
    const saved = getStoredValueWithTTL<PollAnswers>(STORAGE_KEYS.POLL_ANSWERS, DEFAULT_ANSWERS);
    if (saved) {
      const hydrated = { ...DEFAULT_ANSWERS, ...saved };
      setAnswers(hydrated);
      setPollStep(getFirstValidStep(hydrated));
    }
    setIsHydrated(true);
  }, []);

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    if (answers.aiPlatform) {
      setStoredValueWithTTL(STORAGE_KEYS.POLL_ANSWERS, answers, STORAGE_TTL.POLL_ANSWERS);
    }
  }, [answers]);

  const setAnswer = useCallback(<K extends keyof PollAnswers>(field: K, value: PollAnswers[K]) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  const goToLanding = useCallback(() => setPage('landing'), []);
  const goToPoll = useCallback(() => setPage('poll'), []);
  const goToDetails = useCallback(() => setPage('details'), []);
  const goToPayment = useCallback(() => setPage('payment'), []);
  const goToSuccess = useCallback(() => setPage('success'), []);

  // Find next step, skipping conditional steps that don't apply
  // Accepts optional updatedAnswers to use fresh values before state updates
  const nextStep = useCallback((updatedAnswers?: Partial<PollAnswers>) => {
    const effectiveAnswers = updatedAnswers
      ? { ...answers, ...updatedAnswers }
      : answers;

    let next = pollStep + 1;
    while (next < POLL_STEPS.length) {
      const step = POLL_STEPS[next];
      // If step has no conditional, or conditional returns true, use it
      if (!step.conditional || step.conditional(effectiveAnswers)) {
        setPollStep(next);
        return;
      }
      next++;
    }
    // If we've gone through all steps, stay at current (shouldn't happen)
  }, [pollStep, answers]);

  // Find previous step, skipping conditional steps that don't apply
  // Accepts optional updatedAnswers to use fresh values before state updates
  const prevStep = useCallback((updatedAnswers?: Partial<PollAnswers>) => {
    const effectiveAnswers = updatedAnswers
      ? { ...answers, ...updatedAnswers }
      : answers;

    let prev = pollStep - 1;
    while (prev >= 0) {
      const step = POLL_STEPS[prev];
      // If step has no conditional, or conditional returns true, use it
      if (!step.conditional || step.conditional(effectiveAnswers)) {
        setPollStep(prev);
        return;
      }
      prev--;
    }
    // If we've gone through all steps, stay at current (shouldn't happen)
  }, [pollStep, answers]);

  const currentStepConfig: PollStep = POLL_STEPS[pollStep];
  const isFirstStep = pollStep === getFirstValidStep(answers);

  return {
    page,
    pollStep,
    answers,
    isFirstStep,
    isHydrated,
    goToLanding,
    goToPoll,
    goToDetails,
    goToPayment,
    goToSuccess,
    nextStep,
    prevStep,
    setAnswer,
    currentStepConfig,
  };
}
