/**
 * URL encoding/decoding utilities for workout timer
 */

import type { Workout, DecodeResult, UrlCorruptionType } from '@/types';
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
    // Normalize tracker to lowercase (LLMs sometimes generate "WHOOP" instead of "whoop")
    tracker:
      typeof workout.tracker === 'string' ? workout.tracker.toLowerCase() : workout.tracker,
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

// ============================================================================
// Diagnostic Decoder - Enhanced error detection for corrupted URLs
// ============================================================================

/**
 * Detects control characters in a string (except valid whitespace)
 * Common with Gemini's corrupted base64 output
 */
function detectControlCharacters(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // Control chars 0x00-0x1F except tab (0x09), newline (0x0A), carriage return (0x0D)
    if (code < 0x20 && code !== 0x09 && code !== 0x0A && code !== 0x0D) {
      return true;
    }
  }
  return false;
}

/**
 * Attempts to strip control characters for recovery
 */
function stripControlCharacters(str: string): string {
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
}

/**
 * Detects invalid UTF-8 sequences (replacement characters, lone surrogates)
 */
function detectInvalidUtf8(str: string): boolean {
  // Check for Unicode replacement character (appears when UTF-8 is corrupted)
  if (str.includes('\uFFFD')) return true;

  // Check for lone surrogates (invalid in well-formed UTF-8)
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // High surrogate without low surrogate
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = str.charCodeAt(i + 1);
      if (isNaN(next) || next < 0xdc00 || next > 0xdfff) return true;
    }
    // Low surrogate without preceding high surrogate
    if (code >= 0xdc00 && code <= 0xdfff) {
      const prev = str.charCodeAt(i - 1);
      if (isNaN(prev) || prev < 0xd800 || prev > 0xdbff) return true;
    }
  }
  return false;
}

/**
 * Checks if base64 appears truncated
 */
function detectTruncation(encoded: string): boolean {
  // Very short strings are likely truncated (minimum valid workout would be longer)
  if (encoded.length < 50) return true;

  // Base64 without padding should have length % 4 of 0, 2, or 3
  // Length % 4 === 1 is always invalid and indicates truncation
  const withoutPadding = encoded.replace(/=+$/, '');
  return withoutPadding.length % 4 === 1;
}

/**
 * Attempts to decode base64 with proper error reporting
 * Returns decoded JSON string or error type
 */
function tryDecodeBase64(encoded: string): { json: string } | { errorType: UrlCorruptionType } {
  try {
    let base64 = decodeURIComponent(encoded);
    base64 = base64.replace(/[\s-]/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binaryString = atob(base64);
    const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return { json };
  } catch {
    return { errorType: 'invalid_base64' };
  }
}

/**
 * Attempts to parse and validate workout JSON
 * Returns workout or error type
 */
function tryParseWorkout(
  json: string
): { workout: Workout } | { errorType: UrlCorruptionType; details?: string } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch (e) {
    return {
      errorType: 'malformed_json',
      details: e instanceof Error ? e.message : undefined,
    };
  }

  const normalized = normalizeWorkout(data);
  if (!isValidWorkout(normalized)) {
    return { errorType: 'schema_mismatch' };
  }

  return { workout: normalized };
}

/**
 * Error messages for each corruption type
 */
const ERROR_MESSAGES: Record<UrlCorruptionType, string> = {
  control_characters: 'Link contains corrupted data',
  invalid_utf8: 'Text encoding is corrupted',
  malformed_json: 'Workout data is malformed',
  invalid_base64: 'Could not decode link',
  schema_mismatch: 'Workout structure is incorrect',
  truncated: 'Link appears incomplete',
  unknown: 'Could not process link',
};

/**
 * Decodes a workout URL with detailed error diagnostics
 * Provides specific error types to help users understand what went wrong
 *
 * @param encoded - The encoded workout string
 * @returns DecodeResult with success/workout or error details
 */
export function decodeWorkoutUrlWithDiagnostics(encoded: string): DecodeResult {
  // Check for truncation first
  if (detectTruncation(encoded)) {
    return {
      success: false,
      error: {
        type: 'truncated',
        message: ERROR_MESSAGES.truncated,
      },
    };
  }

  // Step 1: Decode base64
  const decodeResult = tryDecodeBase64(encoded);
  if ('errorType' in decodeResult) {
    return {
      success: false,
      error: {
        type: decodeResult.errorType,
        message: ERROR_MESSAGES[decodeResult.errorType],
      },
    };
  }

  const { json } = decodeResult;

  // Step 2: Check for control characters (common Gemini issue)
  if (detectControlCharacters(json)) {
    // Attempt recovery by stripping control characters
    const cleanedJson = stripControlCharacters(json);
    const recoveryResult = tryParseWorkout(cleanedJson);

    if ('workout' in recoveryResult) {
      return {
        success: true,
        workout: recoveryResult.workout,
        recovered: true,
      };
    }

    return {
      success: false,
      error: {
        type: 'control_characters',
        message: ERROR_MESSAGES.control_characters,
        details: 'Gemini encoding issue - invalid characters in data',
      },
    };
  }

  // Step 3: Check for UTF-8 corruption
  if (detectInvalidUtf8(json)) {
    return {
      success: false,
      error: {
        type: 'invalid_utf8',
        message: ERROR_MESSAGES.invalid_utf8,
        details: 'Cyrillic encoding issue - likely from Gemini',
      },
    };
  }

  // Step 4: Parse and validate
  const parseResult = tryParseWorkout(json);
  if ('errorType' in parseResult) {
    return {
      success: false,
      error: {
        type: parseResult.errorType,
        message: ERROR_MESSAGES[parseResult.errorType],
        details: parseResult.details,
      },
    };
  }

  return {
    success: true,
    workout: parseResult.workout,
  };
}
