/**
 * URL encoding/decoding utilities for workout timer
 */

import type { Workout } from '@/types';
import { isValidWorkout } from './validation';

/**
 * Common field name typos/alternatives that LLMs generate
 */
const DURATION_ALIASES = ['time', 'durbation', 'duraction', 'seconds', 'length', 'sec', 'secs'];
const REPS_ALIASES = ['ress', 'rep', 'repetitions', 'reps_count'];

/**
 * Normalizes exercise fields to handle common LLM typos
 */
function normalizeExercise(ex: Record<string, unknown>): Record<string, unknown> {
  const normalized = { ...ex };

  // Fix duration field typos
  if (!('duration' in normalized)) {
    for (const alias of DURATION_ALIASES) {
      if (alias in normalized && typeof normalized[alias] === 'number') {
        normalized.duration = normalized[alias];
        delete normalized[alias];
        break;
      }
    }
  }

  // Fix reps field typos
  if (!('reps' in normalized)) {
    for (const alias of REPS_ALIASES) {
      if (alias in normalized && typeof normalized[alias] === 'string') {
        normalized.reps = normalized[alias];
        delete normalized[alias];
        break;
      }
    }
  }

  return normalized;
}

/**
 * Normalizes workout data to fix common LLM generation errors
 */
function normalizeWorkout(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;

  const workout = data as Record<string, unknown>;
  if (!Array.isArray(workout.exercises)) return data;

  return {
    ...workout,
    exercises: workout.exercises.map((ex) =>
      typeof ex === 'object' && ex !== null ? normalizeExercise(ex as Record<string, unknown>) : ex
    ),
  };
}

/**
 * Encodes a workout object to a URL-safe base64 string
 * Uses URL-safe base64 encoding: + -> -, / -> _, padding removed
 *
 * @param workout - The workout object to encode
 * @returns URL-safe base64 encoded string
 */
export function encodeWorkoutUrl(workout: Workout): string {
  const json = JSON.stringify(workout);
  // Use TextEncoder for proper Unicode support
  const bytes = new TextEncoder().encode(json);
  const binaryString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  const base64 = btoa(binaryString);
  // Convert to URL-safe base64: + -> -, / -> _, remove padding
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decodes a URL-safe base64 string to a workout object
 * Restores standard base64 from URL-safe format before decoding
 *
 * @param encoded - The URL-safe base64 encoded string
 * @returns The decoded data (use isValidWorkout to validate)
 * @throws Error if the string cannot be decoded or parsed
 */
export function decodeWorkoutUrl(encoded: string): unknown {
  // First, URL-decode any %XX sequences (e.g., %20 for space)
  let base64 = decodeURIComponent(encoded);
  // Convert spaces to + (browsers convert + to space in query strings)
  // Also convert - to + (URL-safe base64 format)
  // Both should become + in standard base64
  base64 = base64.replace(/[\s-]/g, '+');
  // Convert _ to / (URL-safe base64 format)
  base64 = base64.replace(/_/g, '/');
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  const binaryString = atob(base64);
  // Use TextDecoder for proper Unicode support
  const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

/**
 * Safely decodes and validates a workout URL parameter
 * Supports multiple encoding formats for better AI compatibility:
 * - Standard URL-safe base64 (preferred)
 * - URL-encoded JSON (ChatGPT fallback)
 * - Multi-level URL-encoded JSON (edge cases)
 *
 * @param encoded - The encoded workout string
 * @returns The validated Workout object or null if invalid
 */
export function safeDecodeWorkoutUrl(encoded: string): Workout | null {
  // Try standard base64 first (preferred format)
  try {
    const data = decodeWorkoutUrl(encoded);
    const normalized = normalizeWorkout(data);
    if (isValidWorkout(normalized)) {
      return normalized;
    }
  } catch {
    // Continue to fallbacks
  }

  // Fallback: try URL-encoded JSON (ChatGPT sometimes does this)
  try {
    const urlDecoded = decodeURIComponent(encoded);
    const data = JSON.parse(urlDecoded);
    const normalized = normalizeWorkout(data);
    if (isValidWorkout(normalized)) {
      return normalized;
    }
  } catch {
    // Continue to next fallback
  }

  // Fallback: try multi-level URL-encoded (edge cases)
  try {
    let decoded = encoded;
    for (let i = 0; i < 3; i++) {
      decoded = decodeURIComponent(decoded);
      try {
        const data = JSON.parse(decoded);
        const normalized = normalizeWorkout(data);
        if (isValidWorkout(normalized)) {
          return normalized;
        }
      } catch {
        // Not valid JSON yet, continue decoding
      }
    }
  } catch {
    // Ignore
  }

  return null;
}

/**
 * Generates a full timer URL from a workout object
 *
 * @param workout - The workout object to encode
 * @param baseUrl - The base timer URL (default: /timer)
 * @returns The complete timer URL with encoded workout
 */
export function generateTimerUrl(workout: Workout, baseUrl: string = '/timer'): string {
  const encoded = encodeWorkoutUrl(workout);
  return `${baseUrl}?w=${encoded}`;
}

/**
 * Extracts the workout parameter from a URL
 *
 * @param url - The URL to parse (can be full URL or just query string)
 * @returns The encoded workout string or null if not found
 */
export function extractWorkoutParam(url: string): string | null {
  try {
    // Handle both full URLs and query strings
    const urlObj = url.startsWith('http') ? new URL(url) : new URL(url, 'http://localhost');
    return urlObj.searchParams.get('w');
  } catch {
    return null;
  }
}
