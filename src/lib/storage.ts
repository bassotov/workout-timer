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
 * TTL (time-to-live) constants for storage expiration
 */
export const STORAGE_TTL = {
  POLL_ANSWERS: 48 * 60 * 60 * 1000, // 48 hours in milliseconds
} as const;

interface StoredValueWithTTL<T> {
  value: T;
  expiresAt: number;
}

/**
 * Stores a value in localStorage with an expiration time
 *
 * @param key - The localStorage key
 * @param value - The value to store
 * @param ttlMs - Time-to-live in milliseconds
 */
export function setStoredValueWithTTL<T>(key: string, value: T, ttlMs: number): void {
  if (typeof window === 'undefined') return;
  try {
    const stored: StoredValueWithTTL<T> = {
      value,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(stored));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Retrieves a value from localStorage with TTL support
 * Automatically removes expired values and returns the default
 *
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if key doesn't exist or is expired
 * @returns The stored value or the default value
 */
export function getStoredValueWithTTL<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    const stored = JSON.parse(item) as StoredValueWithTTL<T>;

    // Check if expired
    if (stored.expiresAt && Date.now() > stored.expiresAt) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return stored.value;
  } catch {
    return defaultValue;
  }
}

/**
 * Gets the remaining TTL for a stored value
 *
 * @param key - The localStorage key
 * @returns Remaining time in milliseconds, 0 if expired, or null if not found/no TTL
 */
export function getRemainingTTL(key: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const stored = JSON.parse(item) as StoredValueWithTTL<unknown>;
    if (!stored.expiresAt) return null;

    const remaining = stored.expiresAt - Date.now();
    return remaining > 0 ? remaining : 0;
  } catch {
    return null;
  }
}

/**
 * Storage keys used in the workout timer app
 */
export const STORAGE_KEYS = {
  POLL_ANSWERS: 'workout-poll-answers',
  LAST_WORKOUT: 'workout-last',
  USER_PREFERENCES: 'workout-preferences',
  PURCHASE_VERIFIED: 'workout-purchase-verified',
} as const;
