/**
 * Input validation utilities
 */

import type { Workout, Exercise } from '@/types';

/**
 * Valid tracker values
 */
const VALID_TRACKERS = ['whoop', 'apple', 'garmin', 'oura', 'other', 'none'] as const;
export type TrackerValue = (typeof VALID_TRACKERS)[number];

/**
 * Mapping of legacy/alternate tracker names to valid values
 */
const TRACKER_ALIASES: Record<string, TrackerValue> = {
  'apple watch': 'apple',
  'applewatch': 'apple',
  'garmin watch': 'garmin',
  'oura ring': 'oura',
  'whoop band': 'whoop',
  'whoop strap': 'whoop',
};

/**
 * Normalizes a tracker value to a valid TrackerValue
 * Supports legacy values like "Apple Watch" → "apple"
 * @param tracker - The tracker value to normalize
 * @returns Normalized tracker value or null if invalid
 */
export function normalizeTracker(tracker: string): TrackerValue | null {
  const lower = tracker.toLowerCase().trim();

  // Direct match
  if (VALID_TRACKERS.includes(lower as TrackerValue)) {
    return lower as TrackerValue;
  }

  // Check aliases
  if (lower in TRACKER_ALIASES) {
    return TRACKER_ALIASES[lower];
  }

  return null;
}

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
  if (workout.tracker !== undefined) {
    const normalized = normalizeTracker(workout.tracker as string);
    if (!normalized) return false;
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

/**
 * Maximum length for custom poll input fields (concise labels like "Martial Arts")
 */
export const MAX_CUSTOM_INPUT_LENGTH = 50;

/**
 * Pattern for allowed characters in custom input
 * Allows: letters (unicode), numbers, spaces, and common punctuation
 */
const ALLOWED_PATTERN = /^[\p{L}\p{N}\s\-\/\.,&()]+$/u;

/**
 * Pattern to detect control characters
 */
const CONTROL_CHARS_PATTERN = /[\x00-\x1F\x7F]/;

export type CustomInputError = 'minChars' | 'maxChars' | 'invalidChars';

export interface CustomInputValidation {
  isValid: boolean;
  sanitized: string;
  error?: CustomInputError;
}

/**
 * Validates custom input from poll "Other" fields
 * @param value - The input value to validate
 * @returns Validation result with sanitized value and optional error
 */
export function validateCustomInput(value: string): CustomInputValidation {
  const trimmed = value.trim();

  // Length checks
  if (trimmed.length < 3) {
    return { isValid: false, sanitized: trimmed, error: 'minChars' };
  }
  if (trimmed.length > MAX_CUSTOM_INPUT_LENGTH) {
    return { isValid: false, sanitized: trimmed, error: 'maxChars' };
  }

  // Check for control characters
  if (CONTROL_CHARS_PATTERN.test(trimmed)) {
    return { isValid: false, sanitized: trimmed, error: 'invalidChars' };
  }

  // Character validation - only allow safe characters
  if (!ALLOWED_PATTERN.test(trimmed)) {
    return { isValid: false, sanitized: trimmed, error: 'invalidChars' };
  }

  return { isValid: true, sanitized: trimmed };
}
