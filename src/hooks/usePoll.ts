'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PollAnswers } from '@/types';
import { POLL_STEPS, type PollStep } from '@/config';
import { getStoredValueWithTTL, setStoredValueWithTTL, STORAGE_KEYS, STORAGE_TTL } from '@/lib';

type Page = 'landing' | 'poll' | 'details' | 'payment' | 'success';

const DEFAULT_ANSWERS: PollAnswers = {
  // Core poll answers
  language: '',
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

// Initialize answers from localStorage (called lazily)
function getInitialAnswers(): PollAnswers {
  if (typeof window === 'undefined') return DEFAULT_ANSWERS;
  const saved = getStoredValueWithTTL<PollAnswers>(STORAGE_KEYS.POLL_ANSWERS, DEFAULT_ANSWERS);
  if (!saved || !saved.language) return DEFAULT_ANSWERS;

  return { ...DEFAULT_ANSWERS, ...saved };
}

export function usePoll() {
  const [page, setPage] = useState<Page>('landing');
  const [pollStep, setPollStep] = useState(0);
  const [answers, setAnswers] = useState<PollAnswers>(getInitialAnswers);

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    if (answers.language) {
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

  return {
    page,
    pollStep,
    answers,
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
