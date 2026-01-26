import type { PollStep, PollOption } from '@/types';

export type { PollStep, PollOption };

export const POLL_STEPS: PollStep[] = [
  {
    id: 'language',
    options: [{ id: 'en' }, { id: 'ru' }],
    conditional: () => false, // Skip - always use English for instructions
  },
  {
    id: 'aiPlatform',
    options: [
      { id: 'chatgpt', logo: '/logos/chatgpt.png', logoInvert: true },
      { id: 'claude', logo: '/logos/claude.png', logoInvert: true },
      { id: 'gemini', logo: '/logos/gemini.png', logoInvert: true },
      { id: 'grok', logo: '/logos/grok.png', logoInvert: true },
      { id: 'perplexity', logo: '/logos/perplexity.png', logoInvert: true },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'trainingType',
    options: [
      { id: 'strength' },
      { id: 'hiit' },
      { id: 'yoga' },
      { id: 'calisthenics' },
      { id: 'cardio' },
      { id: 'pilates' },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'equipment',
    options: [
      { id: 'bodyweight' },
      { id: 'home' },
      { id: 'localgym' },
      { id: 'fullgym' },
    ],
  },
  {
    id: 'weightPreference',
    options: [
      { id: 'light' },      // Under 5 push-ups
      { id: 'moderate' },   // 5-10 push-ups
      { id: 'medium' },     // 10-20 push-ups
      { id: 'heavy' },      // 20-30 push-ups
      { id: 'veryHeavy' },  // 30+ push-ups
      { id: 'unknown' },    // I don't know
    ],
    // Show for all users - helps calibrate workout intensity
  },
  {
    id: 'goals',
    options: [
      { id: 'muscle' },
      { id: 'weight' },
      { id: 'endurance' },
      { id: 'general' },
      { id: 'health' },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'tracker',
    options: [
      { id: 'whoop' },
      { id: 'apple' },
      { id: 'garmin' },
      { id: 'oura' },
      { id: 'other', allowCustom: true },
      { id: 'none' },
    ],
  },
  {
    id: 'coachingStyle',
    options: [{ id: 'motivator' }, { id: 'drill' }, { id: 'friendly' }, { id: 'analytical' }],
  },
];
