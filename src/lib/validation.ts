/**
 * Input validation utilities
 */

import type { Workout, Exercise } from '@/types';

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates an exercise object
 * @param data - The data to validate
 * @returns true if the data is a valid Exercise
 */
function isValidExercise(data: unknown): data is Exercise {
  if (!data || typeof data !== 'object') return false;
  const ex = data as Record<string, unknown>;
  return (
    typeof ex.name === 'string' &&
    typeof ex.reps === 'string' &&
    typeof ex.duration === 'number' &&
    ex.duration > 0
  );
}

/**
 * Validates a workout object against the Workout schema
 * @param data - The data to validate
 * @returns true if the data is a valid Workout
 */
export function isValidWorkout(data: unknown): data is Workout {
  if (!data || typeof data !== 'object') return false;
  const workout = data as Record<string, unknown>;

  // Validate required fields
  if (typeof workout.name !== 'string' || workout.name.length === 0) return false;
  if (typeof workout.rounds !== 'number' || workout.rounds < 1) return false;
  if (typeof workout.restEx !== 'number' || workout.restEx < 0) return false;
  if (typeof workout.restRound !== 'number' || workout.restRound < 0) return false;
  if (typeof workout.cooldown !== 'boolean') return false;

  // Validate exercises array
  if (!Array.isArray(workout.exercises) || workout.exercises.length === 0) return false;
  if (!workout.exercises.every(isValidExercise)) return false;

  // Validate optional fields if present
  if (workout.lang !== undefined && workout.lang !== 'en' && workout.lang !== 'ru') {
    return false;
  }
  if (
    workout.tracker !== undefined &&
    !['whoop', 'apple', 'garmin', 'none'].includes(workout.tracker as string)
  ) {
    return false;
  }

  return true;
}

/**
 * Validates that a string is not empty after trimming
 * @param value - The string to validate
 * @returns true if the string has content
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates that a number is positive
 * @param value - The value to validate
 * @returns true if the value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0 && Number.isFinite(value);
}

/**
 * Validates that a number is non-negative
 * @param value - The value to validate
 * @returns true if the value is a non-negative number
 */
export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && Number.isFinite(value);
}
