import {Container} from "@/components/layout/Container";
import {PartnerForm} from "@/components/partners/PartnerForm";
import {buildPageMetadata} from "@/lib/seo/metadata";
export const dynamic="force-dynamic";
export const metadata=buildPageMetadata({title:"Apply to the Visa Prepper Partner Program",description:"Tell us about your business or audience. Apply as a consultant, adviser, travel business or individual creator. Do not send visa documents.",path:"/partners/apply"});
export default function Apply(){const configured=!!process.env.PARTNER_SUBMISSION_URL&&!!process.env.PARTNER_SUBMISSION_TOKEN;return <Container className="max-w-3xl py-14"><h1 className="font-display text-4xl font-semibold">Become a Visa Prepper partner.</h1><p className="mt-5 text-lg">Tell us about your work and the people you reach.</p><p className="mt-3 text-muted-foreground">Required fields are marked by their labels. Optional fields say “optional.” Do not include passports, visa documents, bank details or payout information.</p><PartnerForm configured={configured}/></Container>;}
