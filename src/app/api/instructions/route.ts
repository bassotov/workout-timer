import { NextRequest, NextResponse } from 'next/server';
import { generateInstructions } from '@/lib/instruction-generator';
import { PURCHASE_COOKIE, readPurchaseToken } from '@/lib/purchase-token';
import { TIMER_BASE_URL } from '@/config/constants';
import type { PollAnswers } from '@/types';

/**
 * POST handler that generates the personalised instructions file.
 *
 * Generation used to run in the browser, which put the paid artifact in the
 * client bundle — any gate in front of it was cosmetic. It runs here now, and
 * only for a caller holding a purchase cookie signed by /api/verify-checkout.
 *
 * The answers come from the client because they are the buyer's own poll
 * responses; the cookie is what proves they paid.
 */
export async function POST(request: NextRequest) {
  if (!readPurchaseToken(request.cookies.get(PURCHASE_COOKIE)?.value)) {
    return NextResponse.json(
      { error: 'No verified purchase found. Please restore your file instead.' },
      { status: 403 }
    );
  }

  let answers: Partial<PollAnswers>;
  try {
    ({ answers } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!answers || typeof answers !== 'object' || !answers.name || !answers.aiPlatform) {
    return NextResponse.json({ error: 'Missing workout preferences' }, { status: 400 });
  }

  const content = generateInstructions(answers as PollAnswers, TIMER_BASE_URL);

  const safeName = answers.name?.replace(/[<>:"/\\|?*]/g, '_').trim() || 'USER';
  const filename = `${safeName}_WORKOUT_INSTRUCTIONS.md`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="WORKOUT_INSTRUCTIONS.md"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
