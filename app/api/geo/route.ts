// Tells the browser which country Vercel sees the visit from, so the Meta
// Pixel loads only in the ad markets (lib/tracking/config.ts). Nothing is stored.
export function GET(request: Request) {
  const header = request.headers.get("x-vercel-ip-country");
  const country = header && /^[A-Z]{2}$/.test(header) ? header : null;
  return Response.json({ country }, { headers: { "Cache-Control": "no-store" } });
}
