import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCheckoutReady } from "@/lib/config/live-offering";
import { EXTERNAL_APP_URL } from "@/lib/config/site";
export const dynamic = "force-dynamic";
export const metadata = { ...buildPageMetadata({title:"Start your interview preparation",description:"Review the current package and app availability before you begin.",path:"/start"}), robots:{index:false,follow:true} };
export default async function StartPage({searchParams}:{searchParams:Promise<{intent?:string}>}) {
  const free = (await searchParams).intent === "free";
  const ready = !free && await getCheckoutReady();
  return <Container className="max-w-3xl py-16">
    <p className="text-sm font-semibold text-primary">{free ? "Your first step" : "Before you pay"}</p>
    <h1 className="mt-3 font-display text-4xl font-semibold">{free ? "Check your documents." : "Six interviews. One clear price."}</h1>
    <p className="mt-5 text-lg">{free ? "Your free access includes one document verification check, a personalised document checklist and preparation guides. It does not include an AI video interview." : "$44 USD once. Six complete AI video interviews, ten document verification checks, personalised tips, and results after every interview. Use the package within 90 days of purchase."}</p>
    {free ? <><p className="mt-6 text-muted-foreground">The check takes place in the Visa Prepper app. If it is unavailable, you can still read our free guides. Do not send documents by email.</p><div className="mt-6"><LinkButton href={EXTERNAL_APP_URL} external>Continue to the app</LinkButton></div></> : ready ? <><p className="mt-6">Payments are processed by Stripe. Review the total and refund terms before paying.</p><div className="mt-6"><LinkButton href="/api/checkout-entry">Continue to the app to pay</LinkButton></div></> : <div role="status" className="mt-7 rounded-2xl border bg-sage-soft p-6"><h2 className="text-xl font-semibold">Checkout is not available yet.</h2><p className="mt-3">We are connecting this package to the app. No payment has been taken. Please check back before buying.</p></div>}
    <p className="mt-7"><Link href="/blog" className="underline">Read free preparation guides</Link> · <Link href="/terms" className="underline">Terms</Link></p>
  </Container>;
}
