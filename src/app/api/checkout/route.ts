import { NextRequest, NextResponse } from 'next/server';
import { Polar } from "@polar-sh/sdk";
import type { PollAnswers } from '@/types';
import { isValidEmail } from '@/lib';

// POST handler for checkout - accepts JSON body with poll answers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers = body.answers as Partial<PollAnswers>;

    // Validate email is present
    if (!answers?.email || typeof answers.email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(answers.email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate required environment variables
    const productId = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;
    const accessToken = process.env.POLAR_ACCESS_TOKEN;
    const successUrl = process.env.POLAR_SUCCESS_URL;

    if (!productId) {
      console.error('Missing NEXT_PUBLIC_POLAR_PRODUCT_ID');
      return NextResponse.json(
        { error: 'Checkout configuration error' },
        { status: 500 }
      );
    }

    if (!accessToken || !successUrl) {
      console.error('Missing POLAR_ACCESS_TOKEN or POLAR_SUCCESS_URL');
      return NextResponse.json(
        { error: 'Checkout configuration error' },
        { status: 500 }
      );
    }

    // Build metadata from poll answers (stored on order for regeneration)
    const metadata = {
      // Core fields
      name: answers.name || '',
      language: answers.language || 'en',
      aiPlatform: answers.aiPlatform || '',
      trainingType: answers.trainingType || '',
      equipment: answers.equipment || '',
      weightPreference: answers.weightPreference || '',
      goals: answers.goals || '',
      tracker: answers.tracker || '',
      coachingStyle: answers.coachingStyle || '',
      limitations: answers.limitations || '',

      // Personalization fields
      gender: answers.gender || '',
      weight: answers.weight || '',
      height: answers.height || '',
      birthYear: answers.birthYear || '',
      customGuidelines: answers.customGuidelines || '',

      // Custom "other" values
      customEquipment: answers.customEquipment || '',
      customAiPlatform: answers.customAiPlatform || '',
      customTracker: answers.customTracker || '',
    };

    // Construct checkout URL with email, name, and metadata
    const checkoutUrl = `/api/checkout?products=${productId}&customerEmail=${encodeURIComponent(answers.email.trim())}&customerName=${encodeURIComponent(answers.name?.trim() || '')}&metadata=${encodeURIComponent(JSON.stringify(metadata))}`;

    return NextResponse.json({ checkoutUrl });
  } catch {
    console.error('Checkout error');
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// GET handler - redirects to Polar checkout (used after POST returns URL)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const products = url.searchParams.getAll('products');

  if (products.length === 0) {
    return NextResponse.json(
      { error: 'Missing products in query params' },
      { status: 400 }
    );
  }

  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const successUrl = process.env.POLAR_SUCCESS_URL;

  if (!accessToken || !successUrl) {
    console.error('Missing POLAR_ACCESS_TOKEN or POLAR_SUCCESS_URL');
    return NextResponse.json(
      { error: 'Checkout configuration error' },
      { status: 500 }
    );
  }

  const polar = new Polar({ accessToken });

  // Parse metadata from query param and filter out empty strings
  // (Polar requires string values to have at least 1 character)
  let metadata: Record<string, string> | undefined;
  const metadataParam = url.searchParams.get('metadata');
  if (metadataParam) {
    try {
      const parsed = JSON.parse(metadataParam) as Record<string, string>;
      // Remove empty string values - Polar rejects them
      metadata = Object.fromEntries(
        Object.entries(parsed).filter(([, value]) => value !== '')
      );
    } catch (e) {
      console.error('Failed to parse metadata:', e);
      return NextResponse.json(
        { error: 'Invalid metadata format' },
        { status: 400 }
      );
    }
  }

  try {
    const result = await polar.checkouts.create({
      products,
      successUrl: successUrl.replace('{CHECKOUT_ID}', '{CHECKOUT_ID}'),
      customerEmail: url.searchParams.get('customerEmail') ?? undefined,
      customerName: url.searchParams.get('customerName') ?? undefined,
      metadata,
    });

    return NextResponse.redirect(result.url);
  } catch (error) {
    // Log the full error for debugging
    console.error('Polar checkout error:', error);

    // Return detailed error info
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error && 'body' in error
      ? JSON.stringify((error as Error & { body?: unknown }).body)
      : undefined;

    return NextResponse.json(
      {
        error: 'Failed to create checkout',
        message: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
