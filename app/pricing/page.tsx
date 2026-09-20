import { Container } from "@/components/layout/Container";
import { Pricing } from "@/components/marketing/Pricing";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata = buildPageMetadata({title:"Visa Interview Practice Pricing — Six Interviews for $44",description:"One free document check, or six AI interviews and ten document checks for $44 USD. One payment. 90 days to practise. No subscription.",path:"/pricing"});
export default function PricingPage(){return <Container className="py-14"><h1 className="font-display text-4xl font-semibold">Six interviews. One payment.</h1><p className="mt-4 mb-10 text-lg">Find what to fix, practise, and try again.</p><Pricing/></Container>;}
