/**
 * In-memory fixed-window rate limiter.
 *
 * Scope caveat: on serverless each instance keeps its own counter, so this
 * throttles rather than hard-caps — enough to make bulk enumeration
 * impractical, not enough to be a strict quota. Swap the Map for a shared
 * store (Upstash/Redis) if this ever needs to be authoritative.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

// Drop expired entries so the Map cannot grow without bound.
function sweep(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets — surface as Retry-After. */
  retryAfter: number;
}

/**
 * Records a hit against `key` and reports whether it is within budget.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  if (windows.size > 5000) sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;

  return {
    allowed: existing.count <= limit,
    retryAfter: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Best-effort client IP. Vercel sets x-forwarded-for; the left-most entry is
 * the client. Falls back to a shared bucket so a missing header degrades to
 * "everyone shares one limit" rather than "no limit at all".
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip')?.trim() || 'unknown';
}
