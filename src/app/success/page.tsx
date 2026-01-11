'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { setStoredValue, STORAGE_KEYS } from '@/lib';

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for checkout_id from Polar - indicates legitimate purchase
    const checkoutId = searchParams.get('checkout_id');

    if (checkoutId) {
      // Set verification flag - user completed actual checkout
      setStoredValue(STORAGE_KEYS.PURCHASE_VERIFIED, {
        timestamp: Date.now(),
        checkoutId,
      });
    }

    // Redirect to main page with success flag
    router.replace('/?success=true');
  }, [router, searchParams]);

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex items-center justify-center">
      <div className="animate-pulse text-xl">Redirecting...</div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-slate-900 text-white flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
