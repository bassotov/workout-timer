/**
 * Quick test script to generate sample workout instructions
 * Run with: npx tsx scripts/test-instructions.ts [platform]
 *
 * Examples:
 *   npx tsx scripts/test-instructions.ts          # default (chatgpt)
 *   npx tsx scripts/test-instructions.ts gemini
 *   npx tsx scripts/test-instructions.ts claude
 */

import { generateInstructions } from '../src/lib/instruction-generator';
import type { PollAnswers } from '../src/types';

const platform = process.argv[2] || 'chatgpt';

const mockAnswers: PollAnswers = {
  name: 'Паша',
  email: 'test@example.com',
  language: 'ru',
  aiPlatform: platform,
  equipment: 'home',
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

const instructions = generateInstructions(mockAnswers, 'https://workout-timer.app/timer');

console.log(`\n=== Generated Instructions for ${platform.toUpperCase()} ===\n`);
console.log(instructions);
