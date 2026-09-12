import { HTTPClient, Polar } from '@polar-sh/sdk';

/**
 * Polar API version pinning.
 *
 * Polar date-stamps its API and ships a new version in the first week of
 * January, April, July and October. A request with no `Polar-Version` header
 * follows whatever is Current, so on 2026-10-01 the contract moves under us
 * whether or not anyone decided it should.
 *
 * That matters most for the two routes that call `api.polar.sh` directly and
 * read fields by name: `/api/verify-checkout` gates the download on
 * `checkout.status` and `checkout.product_id`, and `/api/restore` reads
 * `order.customer_email` and `order.metadata`. A renamed field there does not
 * throw — it reads `undefined`, and a paying customer is told their purchase
 * could not be verified.
 *
 * `2026-04` is what Current already is, so the pin changes nothing today. It
 * stays supported until the January 2027 release; migrating to `2026-10` means
 * reading its release notes, moving this constant, and re-checking those four
 * field names.
 *
 * Server-side only — not exported from `@/lib`, so the SDK never reaches a
 * client bundle.
 */
export const POLAR_API_VERSION = '2026-04';

/** Auth + pinned version, for a direct fetch to api.polar.sh. */
export function polarHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Polar-Version': POLAR_API_VERSION,
  };
}

/**
 * A Polar SDK client that sends the pinned version on every request.
 *
 * The SDK takes no version option — versioned clients live behind the `@next`
 * prerelease under a different import path — so the header goes on by hook.
 */
export function polarClient(accessToken: string): Polar {
  const httpClient = new HTTPClient();
  httpClient.addHook('beforeRequest', (request) => {
    request.headers.set('Polar-Version', POLAR_API_VERSION);
    return request;
  });
  return new Polar({ accessToken, httpClient });
}
