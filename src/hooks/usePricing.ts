import { useSyncExternalStore } from 'react';
import { getPricingInfo, type PricingInfo } from '@/lib';

interface PricingSnapshot extends PricingInfo {
  isClient: boolean;
}

// Cached server snapshot - must be a stable reference.
// Resolved once at module load; useSyncExternalStore swaps in the client
// snapshot on hydration, so a server process that outlives the offer
// deadline still renders the correct price in the browser.
// isClient: false lets consumers hold back client-only UI (the countdown).
const SERVER_SNAPSHOT: PricingSnapshot = {
  ...getPricingInfo(),
  isClient: false,
};

function getServerSnapshot(): PricingSnapshot {
  return SERVER_SNAPSHOT;
}

// Client snapshot - cached to avoid infinite loop
let clientSnapshot: PricingSnapshot | null = null;

function getSnapshot(): PricingSnapshot {
  if (!clientSnapshot) {
    clientSnapshot = {
      ...getPricingInfo(),
      isClient: true,
    };
  }
  return clientSnapshot;
}

// Subscribe to nothing - the price changes once, at the offer deadline
function subscribe(): () => void {
  return () => {};
}

export function usePricing(): { pricing: PricingInfo; isClient: boolean } {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { pricing: snapshot, isClient: snapshot.isClient };
}
