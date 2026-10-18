import { Container } from "@/components/layout/Container";
import { Pricing } from "@/components/marketing/Pricing";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata = buildPageMetadata({title:"Visa Interview Practice Pricing — Six Interviews for $44",description:"One free document check, or six AI interviews and ten document checks for $44 USD. One payment. 90 days to practice. No subscription.",path:"/pricing"});
export default function PricingPage(){return <Container className="py-14"><h1 className="font-display text-4xl font-semibold">Start free. Choose more when you are ready.</h1><p className="mt-4 mb-10 max-w-3xl text-lg">Take one free document check first. For $44, get six complete AI video interviews with feedback after each one. One payment, 90 days to practice and no monthly subscription.</p><Pricing/></Container>;}
