/**
 * Typed localStorage utilities with SSR support
 */

/**
 * Safely retrieves a value from localStorage with type safety
 * Returns the default value if running on server or if value doesn't exist
 *
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The stored value or the default value
 */
export function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely stores a value in localStorage
 * Silently fails on server or when localStorage is unavailable
 *
 * @param key - The localStorage key
 * @param value - The value to store (will be JSON stringified)
 */
export function setStoredValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Safely removes a value from localStorage
 * Silently fails on server or when localStorage is unavailable
 *
 * @param key - The localStorage key to remove
 */
export function removeStoredValue(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

/**
 * Checks if a key exists in localStorage
 *
 * @param key - The localStorage key to check
 * @returns true if the key exists, false otherwise (or if on server)
 */
export function hasStoredValue(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

/**
 * Clears all stored values (use with caution)
 */
export function clearAllStoredValues(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * Storage keys used in the workout timer app
 */
export const STORAGE_KEYS = {
  POLL_ANSWERS: 'workout-poll-answers',
  LAST_WORKOUT: 'workout-last',
  USER_PREFERENCES: 'workout-preferences',
} as const;
