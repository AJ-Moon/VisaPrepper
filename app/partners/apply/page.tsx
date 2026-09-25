import {Container} from "@/components/layout/Container";
import {PartnerForm} from "@/components/partners/PartnerForm";
import {buildPageMetadata} from "@/lib/seo/metadata";
export const metadata=buildPageMetadata({title:"Apply to the Visa Prepper Partner Program",description:"Tell us about your business or audience. Apply as a consultant, adviser, travel business or individual creator. Do not send visa documents.",path:"/partners/apply"});
export default function Apply(){return <Container className="max-w-3xl py-14"><h1 className="font-display text-4xl font-semibold">Become a Visa Prepper partner.</h1><p className="mt-5 text-lg">Enter your contact details, social profile and information about the people you reach.</p><p className="mt-3 text-muted-foreground">Do not include passports, visa documents, bank details or payout information.</p><PartnerForm/></Container>;}
