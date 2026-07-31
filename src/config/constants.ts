export const POLAR_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;
export const TIMER_BASE_URL = process.env.NEXT_PUBLIC_TIMER_BASE_URL || 'https://workout-timer.app/timer';

// Server-side only variables (checked separately in API routes)
const SERVER_ENV_VARS = [
  'POLAR_ACCESS_TOKEN',
  'POLAR_SUCCESS_URL',
  // HMAC key for the purchase cookie — any long random string.
  'PURCHASE_COOKIE_SECRET',
] as const;

interface EnvValidationResult {
  isValid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validates that required environment variables are set.
 * Should be called on app startup.
 *
 * Note: Next.js only replaces process.env.NEXT_PUBLIC_* for static access,
 * so we check the exported constants directly instead of dynamic access.
 */
export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required client-side variables using the exported constants
  // (Next.js doesn't support dynamic process.env access for NEXT_PUBLIC_* vars)
  if (!POLAR_PRODUCT_ID) {
    missing.push('NEXT_PUBLIC_POLAR_PRODUCT_ID');
  }

  // Check optional variables
  if (TIMER_BASE_URL === 'https://workout-timer.app/timer') {
    warnings.push('NEXT_PUBLIC_TIMER_BASE_URL not set, using default value');
  }

  // Log warnings (only in browser to avoid SSR noise)
  if (typeof window !== 'undefined' && warnings.length > 0) {
    warnings.forEach(warning => console.warn(`[Env Warning] ${warning}`));
  }

  // Handle missing required variables
  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;

    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage);
    } else if (typeof window !== 'undefined') {
      console.error(`[Env Error] ${errorMessage}`);
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Validates server-side environment variables.
 * Should be called in API routes that require these variables.
 */
export function validateServerEnv(): EnvValidationResult {
  const missing: string[] = [];

  for (const envVar of SERVER_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.error(`[Server Env Error] Missing: ${missing.join(', ')}`);
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings: [],
  };
}

// Pricing lives in src/lib/pricing.ts — see OFFER_END_DATE there.

export const COUNTDOWN_DURATION = 10;
export const DEFAULT_REST_DURATION = 30;
export const BEEP_THRESHOLD = 4;

export const BEEP_FREQUENCY = 800;
export const BEEP_GAIN = 0.3;
export const BEEP_DURATION = 0.3;
