/**
 * Signed purchase token.
 *
 * Proof, issued server-side only after Polar confirms a checkout was paid,
 * that the bearer may download the generated instructions. Lives in an
 * httpOnly cookie so client code cannot mint or read it — the localStorage
 * flag on the landing page is a UI hint, this is the actual gate.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

export const PURCHASE_COOKIE = 'wt_purchase';

// Matches the 48h re-download grace period in STORAGE_TTL.
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

interface TokenPayload {
  checkoutId: string;
  exp: number;
}

function secret(): string {
  const value = process.env.PURCHASE_COOKIE_SECRET;
  if (!value) throw new Error('Missing PURCHASE_COOKIE_SECRET');
  return value;
}

function sign(body: string): string {
  return createHmac('sha256', secret()).update(body).digest('base64url');
}

/**
 * Mints a token for a confirmed checkout.
 */
export function issuePurchaseToken(checkoutId: string, now: number = Date.now()): string {
  const payload: TokenPayload = { checkoutId, exp: now + TOKEN_TTL_MS };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body)}`;
}

/**
 * Verifies signature and expiry. Returns the payload, or null if the token is
 * absent, malformed, forged or expired.
 */
export function readPurchaseToken(
  token: string | undefined,
  now: number = Date.now()
): TokenPayload | null {
  if (!token) return null;

  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expected = sign(body);
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);

  // Length check first — timingSafeEqual throws on a length mismatch.
  if (given.length !== want.length || !timingSafeEqual(given, want)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as TokenPayload;
    if (typeof payload.exp !== 'number' || payload.exp <= now) return null;
    if (typeof payload.checkoutId !== 'string' || !payload.checkoutId) return null;
    return payload;
  } catch {
    return null;
  }
}

export const PURCHASE_COOKIE_MAX_AGE = TOKEN_TTL_MS / 1000;
