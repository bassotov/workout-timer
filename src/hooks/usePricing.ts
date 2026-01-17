import { useSyncExternalStore } from 'react';
import { getPricingInfo, type PricingInfo } from '@/lib';

interface PricingSnapshot extends PricingInfo {
  isClient: boolean;
}

// Cached server snapshot - must be stable reference
// isClient: false ensures SSR and hydration match
const SERVER_SNAPSHOT: PricingSnapshot = {
  currentPrice: 10,
  nextPrice: 25, // Static "compare at" price
  nextIncreaseDate: new Date('2099-01-01'),
  periodsElapsed: 0,
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

// Subscribe to nothing - pricing changes are rare (every 2 weeks)
function subscribe(): () => void {
  return () => {};
}

export function usePricing(): { pricing: PricingInfo; isClient: boolean } {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { pricing: snapshot, isClient: snapshot.isClient };
}
