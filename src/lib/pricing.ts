/**
 * Launch-offer pricing
 *
 * The product sells for OFFER_PRICE until OFFER_END_DATE, after which it
 * reverts to STANDARD_PRICE. The landing-page countdown is driven by this
 * same date, so the "offer ends in" claim stays true by construction.
 *
 * >>> WHEN OFFER_END_DATE PASSES, SET THE POLAR PRODUCT TO $25 —
 * >>> or move the date forward before it expires.
 *
 * If the date lapses without Polar being updated, the site quotes the higher
 * standard price while checkout still charges the offer price. Customers are
 * never charged more than they were shown, so the failure mode is safe.
 */

// Price after the launch offer ends. Also the crossed-out "compare at" price
// while the offer is running — it is a real future price, not a decoy.
const STANDARD_PRICE = 25;

// Price charged while the offer is running. Must match the Polar product.
const OFFER_PRICE = 19;

// The offer deadline. This must be honoured — see the note above.
export const OFFER_END_DATE = new Date('2026-08-14T00:00:00Z');

export interface PricingInfo {
  /** What the buyer pays right now. */
  currentPrice: number;
  /** Price once the offer ends. Shown crossed out while the offer is live. */
  standardPrice: number;
  /** When the offer ends — drives the countdown. */
  offerEndDate: Date;
  /** False once the deadline has passed. */
  isOfferActive: boolean;
}

/**
 * Resolves pricing for a given moment.
 */
export function getPricingInfo(now: Date = new Date()): PricingInfo {
  const isOfferActive = now.getTime() < OFFER_END_DATE.getTime();

  return {
    currentPrice: isOfferActive ? OFFER_PRICE : STANDARD_PRICE,
    standardPrice: STANDARD_PRICE,
    offerEndDate: OFFER_END_DATE,
    isOfferActive,
  };
}

/**
 * Formats a price as a string (e.g., "$19", "$25")
 */
export function formatPrice(price: number): string {
  return `$${price}`;
}
