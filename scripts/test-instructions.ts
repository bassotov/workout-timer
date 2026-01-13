/**
 * Quick test script to generate sample workout instructions
 * Run with: npx tsx scripts/test-instructions.ts [platform] [--custom]
 *
 * Examples:
 *   npx tsx scripts/test-instructions.ts          # default (chatgpt)
 *   npx tsx scripts/test-instructions.ts gemini
 *   npx tsx scripts/test-instructions.ts claude
 *   npx tsx scripts/test-instructions.ts chatgpt --custom  # test custom "other" values
 */

import { generateInstructions } from '../src/lib/instruction-generator';
import type { PollAnswers } from '../src/types';

const platform = process.argv[2] || 'chatgpt';
const useCustomValues = process.argv.includes('--custom');

// Standard mock answers with predefined options
const standardAnswers: PollAnswers = {
  name: 'Паша',
  email: 'test@example.com',
  language: 'ru',
  aiPlatform: platform,
  equipment: 'home',
  weightPreference: 'medium',
  goals: 'muscle',
  trainingType: 'hiit',
  tracker: 'apple',
  coachingStyle: 'motivator',
  limitations: 'Вывих левого плеча в 2023-2024, нужно аккуратнее',
  gender: 'male',
  weight: '96 kg',
  height: '193 cm',
  birthYear: '1996',
  customGuidelines: 'Фокус на функциональных движениях',
};

// Mock answers with custom "other" values
const customAnswers: PollAnswers = {
  name: 'Alex',
  email: 'test@example.com',
  language: 'en',
  aiPlatform: 'other',
  customAiPlatform: 'Copilot',
  equipment: 'home',
  weightPreference: 'medium',
  goals: 'other',
  customGoals: 'Improve flexibility and balance',
  trainingType: 'other',
  customTrainingType: 'Martial Arts Training',
  tracker: 'other',
  customTracker: 'Samsung Galaxy Watch',
  coachingStyle: 'drill',
  limitations: 'Recent knee surgery - avoid jumping',
  gender: 'male',
  weight: '80 kg',
  height: '180 cm',
  birthYear: '1990',
  customGuidelines: 'Focus on low-impact movements',
};

const mockAnswers = useCustomValues ? customAnswers : standardAnswers;
const instructions = generateInstructions(mockAnswers, 'https://workout-timer.app/timer');

const mode = useCustomValues ? 'CUSTOM VALUES' : platform.toUpperCase();
console.log(`\n=== Generated Instructions for ${mode} ===\n`);
console.log(instructions);

// When testing custom values, verify they appear in output
if (useCustomValues) {
  console.log('\n=== Custom Value Verification ===');
  const checks = [
    { name: 'customTrainingType', value: 'Martial Arts Training', found: instructions.includes('Martial Arts Training') },
    { name: 'customGoals', value: 'Improve flexibility and balance', found: instructions.includes('Improve flexibility and balance') },
    { name: 'customTracker', value: 'Samsung Galaxy Watch', found: instructions.includes('Samsung Galaxy Watch') },
  ];

  for (const check of checks) {
    const status = check.found ? '✅' : '❌';
    console.log(`${status} ${check.name}: "${check.value}" ${check.found ? 'found' : 'NOT FOUND'}`);
  }
}
