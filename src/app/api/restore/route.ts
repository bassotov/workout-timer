import { NextRequest, NextResponse } from 'next/server';
import { generateInstructions } from '@/lib';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { TIMER_BASE_URL } from '@/config/constants';
import type { PollAnswers } from '@/types';

/**
 * GET handler for restoring workout instructions from Polar order metadata
 * Usage: /api/restore?email=user@example.com&order=<polar order id>
 *
 * The order id is required as proof of purchase. Email alone used to be
 * enough, which made this endpoint an open lookup for any customer's name,
 * goals and physical limitations — and an oracle for whether a given address
 * had bought. Both identifiers must now point at the same order, lookups are
 * rate limited, and every failure returns the same response so nothing can be
 * inferred from the difference.
 */

/** One response for every "no" — never reveal which half was wrong. */
function notFound() {
  return NextResponse.json(
    { error: 'No purchase found for those details. Check your receipt email and try again.' },
    { status: 404 }
  );
}

export async function GET(request: NextRequest) {
  const limit = rateLimit(`restore:${clientIp(request.headers)}`, 10, 60 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many lookups. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const email = request.nextUrl.searchParams.get('email')?.trim();
  const orderId = request.nextUrl.searchParams.get('order')?.trim();

  if (!email || !orderId) {
    return NextResponse.json(
      { error: 'Please enter both your email address and your order ID.' },
      { status: 400 }
    );
  }

  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('Missing POLAR_ACCESS_TOKEN');
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again later.' },
      { status: 500 }
    );
  }

  try {
    // Fetch the order directly. Anyone can guess an email; the order id is
    // the part only the buyer has.
    const orderResponse = await fetch(
      `https://api.polar.sh/v1/orders/${encodeURIComponent(orderId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }
    );

    if (orderResponse.status === 404) return notFound();

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Polar orders API error:', orderResponse.status, errorText);
      return NextResponse.json(
        { error: 'Unable to retrieve your order. Please try again later.' },
        { status: 502 }
      );
    }

    const order = await orderResponse.json();

    // The order must belong to the email supplied — otherwise a leaked order
    // id would expose whoever it actually belongs to.
    const orderEmail = String(order.customer_email || '').toLowerCase();
    if (!orderEmail || orderEmail !== email.toLowerCase()) return notFound();

    // Validate metadata exists
    if (!order.metadata || Object.keys(order.metadata).length === 0) {
      return NextResponse.json(
        { error: 'This order was placed before we started saving your preferences. Please contact support for help.' },
        { status: 400 }
      );
    }

    // Check if user chose to discard their data
    if (order.metadata?.dataConsent === 'discarded') {
      const discardedAt = order.metadata.discardedAt;
      const lang = order.metadata.language || 'en';

      return NextResponse.json(
        {
          error:
            lang === 'ru'
              ? 'Вы выбрали не сохранять данные при покупке. Восстановление файла невозможно.'
              : 'You chose not to save your data at checkout. File restoration is not possible.',
          code: 'DATA_DISCARDED',
          discardedAt,
          helpMessage:
            lang === 'ru'
              ? 'Свяжитесь с поддержкой для получения скидки 50% на повторную покупку.'
              : 'Contact support for a 50% discount on repurchase.',
        },
        { status: 410 } // 410 Gone - resource no longer available
      );
    }

    // Reconstruct PollAnswers from order metadata
    const answers: PollAnswers = {
      name: order.metadata.name || '',
      language: order.metadata.language || 'en',
      aiPlatform: order.metadata.aiPlatform || '',
      trainingType: order.metadata.trainingType || '',
      equipment: order.metadata.equipment || '',
      weightPreference: order.metadata.weightPreference || '',
      goals: order.metadata.goals || '',
      tracker: order.metadata.tracker || '',
      coachingStyle: order.metadata.coachingStyle || '',
      limitations: order.metadata.limitations || '',
      email: order.customer_email || email,
    };

    // Generate instructions content
    const content = generateInstructions(answers, TIMER_BASE_URL);

    // Create personalized filename (preserve Cyrillic, remove unsafe chars)
    const safeName = answers.name?.replace(/[<>:"/\\|?*]/g, '_').trim() || 'USER';
    const filename = `${safeName}_WORKOUT_INSTRUCTIONS.md`;

    // Return as downloadable file with UTF-8 filename encoding
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="WORKOUT_INSTRUCTIONS.md"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      },
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json(
      { error: 'Unable to generate your file. Please try again later.' },
      { status: 500 }
    );
  }
}
