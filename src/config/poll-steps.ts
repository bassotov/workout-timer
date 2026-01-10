import type { PollStep, PollOption } from '@/types';

export type { PollStep, PollOption };

export const POLL_STEPS: PollStep[] = [
  {
    id: 'language',
    options: [{ id: 'en' }, { id: 'ru' }],
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
    options: [{ id: 'strength' }, { id: 'hiit' }, { id: 'yoga' }, { id: 'mixed' }],
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
    id: 'goals',
    options: [{ id: 'muscle' }, { id: 'weight' }, { id: 'endurance' }, { id: 'general' }],
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
