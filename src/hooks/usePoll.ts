'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PollAnswers } from '@/types';
import { POLL_STEPS, type PollStep } from '@/config';
import { getStoredValue, setStoredValue, STORAGE_KEYS } from '@/lib/storage';

type Page = 'landing' | 'poll' | 'details' | 'payment' | 'success';

const DEFAULT_ANSWERS: PollAnswers = {
  // Core poll answers
  language: '',
  aiPlatform: '',
  trainingType: '',
  equipment: '',
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
};

// Initialize answers from localStorage (called lazily)
function getInitialAnswers(): PollAnswers {
  if (typeof window === 'undefined') return DEFAULT_ANSWERS;
  const saved = getStoredValue<PollAnswers>(STORAGE_KEYS.POLL_ANSWERS, DEFAULT_ANSWERS);
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
      setStoredValue(STORAGE_KEYS.POLL_ANSWERS, answers);
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

  const nextStep = useCallback(() => {
    if (pollStep < POLL_STEPS.length - 1) {
      setPollStep(prev => prev + 1);
    }
  }, [pollStep]);

  const prevStep = useCallback(() => {
    if (pollStep > 0) {
      setPollStep(prev => prev - 1);
    }
  }, [pollStep]);

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
