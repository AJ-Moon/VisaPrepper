import { COMPLETE_OFFER } from "./offer";
import { EXTERNAL_APP_URL } from "./site";
export type PublicPlan = { id: string; name: string; price: number; description: string; interviews: number; checks: number; personalized: boolean; validityDays?: number };
/** Fail closed: the old application packages must not replace the approved website offer. */
export function matchesCompleteOffer(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const offering = data as Record<string, unknown>;
  const packages = offering.packages as Record<string, Record<string, unknown>> | undefined;
  const plan = packages?.[COMPLETE_OFFER.id];
  return offering.checkout_available === true && !!plan && plan.enabled === true &&
    plan.price_cents === COMPLETE_OFFER.priceCents && plan.interviews === COMPLETE_OFFER.interviews &&
    plan.documents === COMPLETE_OFFER.checks && plan.validity_days === COMPLETE_OFFER.validityDays &&
    plan.currency === COMPLETE_OFFER.currency;
}
export async function getCheckoutReady(): Promise<boolean> {
  // Owner must explicitly enable after app/Stripe/expiry/refund-policy release checks.
  if (process.env.COMPLETE_OFFER_CHECKOUT_ENABLED !== "true") return false;
  try {
    const response = await fetch(`${EXTERNAL_APP_URL}/api/public/offering`, { cache: "no-store", signal: AbortSignal.timeout(2500) });
    return response.ok && matchesCompleteOffer(await response.json());
  } catch { return false; }
}
