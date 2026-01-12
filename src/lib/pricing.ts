/**
 * Dynamic pricing utilities
 *
 * Price increases by $2 every 2 weeks from the launch date.
 */

// Launch date - the starting point for price calculations
const LAUNCH_DATE = new Date('2026-01-12T00:00:00Z');

// Pricing constants
const BASE_PRICE = 10; // Starting price in dollars
const PRICE_INCREMENT = 2; // Increase per period in dollars
const PERIOD_DAYS = 14; // Days between price increases
const PERIOD_MS = PERIOD_DAYS * 24 * 60 * 60 * 1000;

export interface PricingInfo {
  currentPrice: number;
  nextPrice: number;
  nextIncreaseDate: Date;
  periodsElapsed: number;
}

/**
 * Calculates the current pricing info based on elapsed time since launch
 */
export function getPricingInfo(now: Date = new Date()): PricingInfo {
  const elapsed = now.getTime() - LAUNCH_DATE.getTime();

  // Calculate how many complete periods have passed
  const periodsElapsed = Math.max(0, Math.floor(elapsed / PERIOD_MS));

  // Current price = base + (periods * increment)
  const currentPrice = BASE_PRICE + periodsElapsed * PRICE_INCREMENT;
  const nextPrice = currentPrice + PRICE_INCREMENT;

  // Next increase date = launch + (periods + 1) * period duration
  const nextIncreaseDate = new Date(LAUNCH_DATE.getTime() + (periodsElapsed + 1) * PERIOD_MS);

  return {
    currentPrice,
    nextPrice,
    nextIncreaseDate,
    periodsElapsed,
  };
}

/**
 * Formats a price as a string (e.g., "$10", "$12")
 */
export function formatPrice(price: number): string {
  return `$${price}`;
}
