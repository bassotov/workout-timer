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
      { id: 'chatgpt' },
      { id: 'claude' },
      { id: 'gemini' },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'trainingType',
    options: [
      { id: 'strength' },
      { id: 'hiit' },
      { id: 'yoga' },
      { id: 'mixed' },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'equipment',
    options: [
      { id: 'bodyweight' },
      { id: 'home' },
      { id: 'fullgym' },
      { id: 'custom', allowCustom: true },
    ],
  },
  {
    id: 'weightPreference',
    options: [
      { id: 'light' },      // 2kg / 4lb
      { id: 'moderate' },   // 7kg / 15lb
      { id: 'medium' },     // 12kg / 25lb
      { id: 'heavy' },      // 15kg / 35lb
      { id: 'veryHeavy' },  // 20kg+ / 45lb+
      { id: 'unknown' },    // I don't know
    ],
    conditional: (answers) => ['home', 'fullgym'].includes(answers.equipment),
  },
  {
    id: 'goals',
    options: [
      { id: 'muscle' },
      { id: 'weight' },
      { id: 'endurance' },
      { id: 'general' },
      { id: 'other', allowCustom: true },
    ],
  },
  {
    id: 'tracker',
    options: [
      { id: 'whoop' },
      { id: 'apple' },
      { id: 'garmin' },
      { id: 'other', allowCustom: true },
      { id: 'none' },
    ],
  },
  {
    id: 'coachingStyle',
    options: [{ id: 'motivator' }, { id: 'drill' }, { id: 'friendly' }, { id: 'analytical' }],
  },
];
