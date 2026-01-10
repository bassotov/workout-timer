import type { Workout } from './workout';

/**
 * Types of URL corruption that can be detected
 */
export type UrlCorruptionType =
  | 'control_characters' // JSON contains control chars 0x00-0x1F
  | 'invalid_utf8' // Malformed UTF-8 / replacement chars
  | 'malformed_json' // JSON syntax error
  | 'invalid_base64' // Not valid base64
  | 'schema_mismatch' // Valid JSON but missing fields
  | 'truncated' // Link appears cut off
  | 'unknown';

/**
 * Error details from URL decoding
 */
export interface DecodeError {
  type: UrlCorruptionType;
  message: string;
  details?: string;
}

/**
 * Result from diagnostic URL decoding
 */
export interface DecodeResult {
  success: boolean;
  workout?: Workout;
  error?: DecodeError;
  recovered?: boolean; // True if auto-recovery succeeded
}
