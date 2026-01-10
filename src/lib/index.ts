/**
 * Barrel exports for lib utilities
 */

// Class utilities
export { cn } from './utils';

// Validation
export {
  isValidEmail,
  isValidWorkout,
  isNonEmptyString,
  isPositiveNumber,
  isNonNegativeNumber,
} from './validation';

// URL utilities
export {
  encodeWorkoutUrl,
  decodeWorkoutUrl,
  safeDecodeWorkoutUrl,
  generateTimerUrl,
  extractWorkoutParam,
} from './url';

// Time utilities
export {
  formatTime,
  formatTimeLong,
  calculateTotalDuration,
  calculateTotalDurationMinutes,
  parseDurationString,
  humanizeDuration,
} from './time';

// Storage utilities
export {
  getStoredValue,
  setStoredValue,
  removeStoredValue,
  hasStoredValue,
  clearAllStoredValues,
  STORAGE_KEYS,
} from './storage';

// Workout instruction generator
export { generateInstructions } from './instruction-generator';
