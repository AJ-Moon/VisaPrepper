import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const dynamic = "force-dynamic";
export const metadata = { ...buildPageMetadata({ title: "Start your preparation", description: "Continue to the VisaPrepper application to sign in or create an account, then choose your preparation.", path: "/start" }), robots: { index: false, follow: true } };
export default async function StartPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const free = (await searchParams).intent === "free";
  return <Container className="max-w-3xl py-12 sm:py-16">
    <p className="text-sm font-semibold text-primary">Continue to VisaPrepper</p>
    <h1 className="mt-3 font-display text-4xl font-semibold">{free ? "Start with your documents." : "Prepare around your own application."}</h1>
    <p className="mt-5 text-lg leading-relaxed">Sign in or create an account in the application, then choose document review or interview practice. Existing signed-in applicants follow the app&apos;s own landing flow.</p>
    <p className="mt-5 leading-relaxed">{free ? "One free document check reviews your selected bundle. The app asks for required route facts; optional profile details can be reviewed separately." : "$44 USD once includes six AI video interviews, ten document checks and 90 days from purchase. View the package in the app; purchasing availability is controlled there."}</p>
    <div className="mt-7"><CtaButton label="Continue to the app" intent={free ? "free" : "paid"} size="lg" /></div>
    <p className="mt-5 text-sm text-muted-foreground">No payment or document upload takes place on this website. Use the secure app for uploads; do not send visa documents through email or WhatsApp.</p>
    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link href="/document-checks" className="underline">About document checks</Link><Link href="/pricing" className="underline">Package details</Link><Link href="/blog" className="underline">Free guides</Link><Link href="/privacy" className="underline">Privacy</Link><Link href="/terms" className="underline">Terms</Link></div>
  </Container>;
}
