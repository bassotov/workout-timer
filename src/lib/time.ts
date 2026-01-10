/**
 * Time formatting and calculation utilities
 */

import type { Workout } from '@/types';

/** Default cooldown duration in seconds (5 minutes) */
const COOLDOWN_DURATION = 300;

/**
 * Formats seconds into MM:SS format
 *
 * @param seconds - The number of seconds to format
 * @returns Formatted time string (e.g., "3:45")
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats seconds into HH:MM:SS format for longer durations
 *
 * @param seconds - The number of seconds to format
 * @returns Formatted time string (e.g., "1:03:45")
 */
export function formatTimeLong(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return formatTime(seconds);
}

/**
 * Calculates the total workout duration in seconds
 *
 * @param workout - The workout object
 * @param cooldownDuration - Duration of cooldown in seconds (default: 300)
 * @returns Total duration in seconds
 */
export function calculateTotalDuration(
  workout: Workout,
  cooldownDuration: number = COOLDOWN_DURATION
): number {
  const { exercises, rounds, restEx, restRound, cooldown } = workout;

  // Total exercise time for one round
  const exerciseTime = exercises.reduce((acc, ex) => acc + ex.duration, 0);

  // Rest between exercises (one less rest than exercises)
  const restBetweenExercises = restEx * Math.max(0, exercises.length - 1);

  // Total time for one complete round
  const roundTime = exerciseTime + restBetweenExercises;

  // Total time for all rounds
  const totalRoundsTime = roundTime * rounds;

  // Rest between rounds (one less rest than rounds)
  const restBetweenRounds = restRound * Math.max(0, rounds - 1);

  // Add cooldown if enabled
  const cooldownTime = cooldown ? cooldownDuration : 0;

  return totalRoundsTime + restBetweenRounds + cooldownTime;
}

/**
 * Calculates the total workout duration in minutes (rounded)
 *
 * @param workout - The workout object
 * @param cooldownDuration - Duration of cooldown in seconds (default: 300)
 * @returns Total duration in minutes (rounded to nearest minute)
 */
export function calculateTotalDurationMinutes(
  workout: Workout,
  cooldownDuration: number = COOLDOWN_DURATION
): number {
  return Math.round(calculateTotalDuration(workout, cooldownDuration) / 60);
}

/**
 * Parses a duration string (e.g., "30 sec", "2 min") into seconds
 *
 * @param duration - Duration string to parse
 * @returns Duration in seconds, or null if unable to parse
 */
export function parseDurationString(duration: string): number | null {
  const normalized = duration.toLowerCase().trim();

  // Match patterns like "30 sec", "30s", "2 min", "2m", "1:30"
  const secMatch = normalized.match(/^(\d+)\s*(s|sec|seconds?)?$/);
  if (secMatch) {
    return parseInt(secMatch[1], 10);
  }

  const minMatch = normalized.match(/^(\d+)\s*(m|min|minutes?)$/);
  if (minMatch) {
    return parseInt(minMatch[1], 10) * 60;
  }

  const timeMatch = normalized.match(/^(\d+):(\d{1,2})$/);
  if (timeMatch) {
    return parseInt(timeMatch[1], 10) * 60 + parseInt(timeMatch[2], 10);
  }

  return null;
}

/**
 * Converts seconds to a human-readable duration string
 *
 * @param seconds - Duration in seconds
 * @param lang - Language for output ('en' or 'ru')
 * @returns Human-readable duration string
 */
export function humanizeDuration(seconds: number, lang: 'en' | 'ru' = 'en'): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (lang === 'ru') {
    if (hours > 0) parts.push(`${hours} ч`);
    if (mins > 0) parts.push(`${mins} мин`);
    if (secs > 0 && hours === 0) parts.push(`${secs} сек`);
  } else {
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 && hours === 0) parts.push(`${secs}s`);
  }

  return parts.join(' ') || (lang === 'ru' ? '0 сек' : '0s');
}
