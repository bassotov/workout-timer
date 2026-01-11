import { NextRequest, NextResponse } from 'next/server';
import { generateInstructions } from '@/lib';
import { TIMER_BASE_URL } from '@/config/constants';
import type { PollAnswers } from '@/types';

/**
 * GET handler for restoring workout instructions from Polar order metadata
 * Looks up the customer by email and returns their most recent order's instructions
 * Usage: /api/restore?email=user@example.com
 */
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Please enter your email address' },
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
    // Get customer by email
    const customerResponse = await fetch(
      `https://api.polar.sh/v1/customers?email=${encodeURIComponent(email)}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }
    );

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error('Polar customers API error:', customerResponse.status, errorText);
      return NextResponse.json(
        { error: `Unable to look up your account (${customerResponse.status}). Please try again later.` },
        { status: 502 }
      );
    }

    const customerData = await customerResponse.json();
    if (!customerData.items || customerData.items.length === 0) {
      return NextResponse.json(
        { error: 'No purchase found for this email. Please check and try again.' },
        { status: 404 }
      );
    }

    const customerId = customerData.items[0].id;

    // Get their most recent order
    const orderResponse = await fetch(
      `https://api.polar.sh/v1/orders?customer_id=${customerId}&limit=1&sorting=-created_at`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }
    );

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Polar orders API error:', orderResponse.status, errorText);
      return NextResponse.json(
        { error: `Unable to retrieve your order (${orderResponse.status}). Please try again later.` },
        { status: 502 }
      );
    }

    const orderData = await orderResponse.json();
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'No orders found for this account. Please contact support.' },
        { status: 404 }
      );
    }

    const order = orderData.items[0];

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
