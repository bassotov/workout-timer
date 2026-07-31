import { NextRequest, NextResponse } from 'next/server';
import { issuePurchaseToken, PURCHASE_COOKIE, PURCHASE_COOKIE_MAX_AGE } from '@/lib/purchase-token';
import { rateLimit, clientIp } from '@/lib/rate-limit';

/**
 * POST handler that turns a Polar checkout id into a signed purchase cookie.
 *
 * The success page used to trust any checkout_id it was handed and write a
 * localStorage flag, which meant /success?checkout_id=anything unlocked the
 * download. Nothing is trusted here until Polar confirms the checkout was
 * actually paid, for this product.
 */
export async function POST(request: NextRequest) {
  const limit = rateLimit(`verify:${clientIp(request.headers)}`, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  let checkoutId: unknown;
  try {
    ({ checkoutId } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (typeof checkoutId !== 'string' || !checkoutId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;

  if (!accessToken || !productId || !process.env.PURCHASE_COOKIE_SECRET) {
    console.error('verify-checkout: missing POLAR_ACCESS_TOKEN, product id or PURCHASE_COOKIE_SECRET');
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again later.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.polar.sh/v1/checkouts/${encodeURIComponent(checkoutId)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!response.ok) {
      // 404 from Polar means a fabricated id — same answer as an unpaid one.
      return NextResponse.json({ error: 'Purchase could not be verified.' }, { status: 403 });
    }

    const checkout = await response.json();

    const isPaid = checkout.status === 'succeeded';
    const isOurProduct = checkout.product_id === productId;

    if (!isPaid || !isOurProduct) {
      return NextResponse.json({ error: 'Purchase could not be verified.' }, { status: 403 });
    }

    const result = NextResponse.json({ verified: true });

    result.cookies.set(PURCHASE_COOKIE, issuePurchaseToken(checkout.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: PURCHASE_COOKIE_MAX_AGE,
    });

    return result;
  } catch (error) {
    console.error('verify-checkout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again later.' },
      { status: 500 }
    );
  }
}
