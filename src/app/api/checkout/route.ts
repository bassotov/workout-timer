import { NextRequest, NextResponse } from 'next/server';
import { Checkout } from "@polar-sh/nextjs";
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

    // Construct checkout URL with email and metadata
    const checkoutUrl = `/api/checkout?products=${productId}&customerEmail=${encodeURIComponent(answers.email.trim())}&metadata=${encodeURIComponent(JSON.stringify(metadata))}`;

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
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: process.env.POLAR_SUCCESS_URL!,
});
