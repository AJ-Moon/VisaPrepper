import { getCheckoutReady } from "@/lib/config/live-offering";
import { EXTERNAL_APP_URL } from "@/lib/config/site";
import { COMPLETE_OFFER } from "@/lib/config/offer";
export async function GET() {
  if (!await getCheckoutReady()) return Response.json({error:"Checkout is not available yet."},{status:503,headers:{"Cache-Control":"no-store"}});
  // Application must authenticate and resolve package_id on the server. This never grants credits.
  return Response.redirect(`${EXTERNAL_APP_URL}/billing?package=${COMPLETE_OFFER.id}`,303);
}
