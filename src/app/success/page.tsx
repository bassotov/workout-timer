'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with success flag
    // The checkout_id is preserved in case we need it later
    router.replace('/?success=true');
  }, [router]);

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex items-center justify-center">
      <div className="animate-pulse text-xl">Redirecting...</div>
    </div>
  );
}
