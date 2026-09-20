// Owner-confirmed offer for new purchases. Never use browser values to grant credits.
export const COMPLETE_OFFER = {
  id: "complete-44-v1", name: "Complete Interview Preparation",
  price: 44, priceCents: 4400, currency: "USD", interviews: 6, checks: 10, validityDays: 90,
} as const;
export const FREE_OFFER = { id: "free", name: "Free", price: 0, interviews: 0, checks: 1 } as const;
