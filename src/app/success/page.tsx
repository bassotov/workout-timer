'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { setStoredValue, STORAGE_KEYS } from '@/lib';

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkoutId = searchParams.get('checkout_id');

    if (!checkoutId) {
      router.replace('/?success=true');
      return;
    }

    // Polar hands us a checkout id; only the server may decide it is real.
    // A successful call sets the httpOnly cookie that /api/instructions
    // requires — the localStorage flag below is just UI state.
    let cancelled = false;

    fetch('/api/verify-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkoutId }),
    })
      .then((response) => {
        if (cancelled || !response.ok) return;
        setStoredValue(STORAGE_KEYS.PURCHASE_VERIFIED, {
          timestamp: Date.now(),
          checkoutId,
        });
      })
      .catch(() => {
        // Network failure — fall through to the success page, where the
        // download will fail closed and point the user at /restore.
      })
      .finally(() => {
        if (!cancelled) router.replace('/?success=true');
      });

    return () => {
      cancelled = true;
    };
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
