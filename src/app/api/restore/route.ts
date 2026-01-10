import { NextRequest, NextResponse } from 'next/server';
import { generateInstructions } from '@/lib';
import { TIMER_BASE_URL } from '@/config/constants';
import type { PollAnswers } from '@/types';

/**
 * GET handler for restoring workout instructions from Polar order metadata
 * Usage: /api/restore?order_id=xxx
 */
export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json(
      { error: 'Please enter your order ID' },
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
    // Fetch order from Polar API
    const response = await fetch(`https://api.polar.sh/v1/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Order not found. Please check your order ID and try again.' },
          { status: 404 }
        );
      }
      console.error('Polar API error:', response.status);
      return NextResponse.json(
        { error: 'Unable to retrieve your order. Please try again later.' },
        { status: 502 }
      );
    }

    const order = await response.json();

    // Validate metadata exists
    if (!order.metadata || Object.keys(order.metadata).length === 0) {
      return NextResponse.json(
        { error: 'This order was placed before we started saving your preferences. Please contact support for help.' },
        { status: 400 }
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
      email: order.customer_email || '',
    };

    // Generate instructions content
    const content = generateInstructions(answers, TIMER_BASE_URL);

    // Create personalized filename
    const safeName = answers.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'USER';
    const filename = `${safeName}_WORKOUT_INSTRUCTIONS.md`;

    // Return as downloadable file
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
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
