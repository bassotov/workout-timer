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
  validateCustomInput,
  MAX_CUSTOM_INPUT_LENGTH,
  type CustomInputError,
  type CustomInputValidation,
} from './validation';

// Poll utilities
export { getVisibleSteps, getVisibleStepIndex } from './poll-utils';

// URL utilities
export {
  encodeWorkoutUrl,
  decodeWorkoutUrl,
  safeDecodeWorkoutUrl,
  decodeWorkoutUrlWithDiagnostics,
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
  getStoredValueWithTTL,
  setStoredValueWithTTL,
  getRemainingTTL,
  STORAGE_KEYS,
  STORAGE_TTL,
} from './storage';

// Workout instruction generator
export { generateInstructions } from './instruction-generator';

// File sharing/download
export { downloadOrShareFile } from './share';

// Pricing utilities
export { getPricingInfo, formatPrice, type PricingInfo } from './pricing';

// Workout utilities
export { extractUniqueWeights, extractSmartEquipment, type EquipmentItem } from './workout-utils';
