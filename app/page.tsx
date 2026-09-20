import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pricing } from "@/components/marketing/Pricing";
import { Testimonials } from "@/components/marketing/Testimonials";
import { SurveyResult } from "@/components/marketing/SurveyResult";
import { DepthCard } from "@/components/marketing/ScrollEffects";
import { DestinationGrid } from "@/components/marketing/DestinationGrid";
import { LanguageWelcome } from "@/components/marketing/LanguageWelcome";
import { AndroidApp } from "@/components/marketing/AndroidApp";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { HOMEPAGE_FAQ } from "@/lib/content/faq";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildSoftwareApplicationJsonLd, buildWebsiteJsonLd } from "@/lib/seo/json-ld";
const title = "AI Visa Interview Practice | Visa Prepper";
export const metadata = {...buildPageMetadata({title,description:"Scared you may go blank? Practise visa questions based on your documents. Find unclear answers. Six AI interviews and ten document checks for $44.",path:"/"}),title:{absolute:title}};
const problems = [
 ["Scared you will go blank?","Practise answering out loud. Get used to explaining your plans."],
 ["Not sure what to say?","Work on clear answers about your trip, studies, job, money or family."],
 ["Do your answers match your form?","Find details that are missing, different or hard to explain."],
 ["Worried about follow-up questions?","Practise the questions that may come after your first answer."],
 ["Do you speak for too long?","Learn to answer the question clearly, without losing the main point."],
 ["Is your confidence low?","Try a serious practice interview before the real day."],
];
export default function Home() {
 return <>
  <JsonLd data={buildSoftwareApplicationJsonLd()}/><JsonLd data={buildWebsiteJsonLd()}/>
  <section className="bg-gradient-to-b from-sage-soft/70 to-background">
   <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
    <div><p className="text-sm font-semibold text-primary">AI visa interview practice based on your own documents</p>
     <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl">Scared you may fail your visa interview?</h1>
     <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Find out what to fix before the real day. Practise questions from your own documents. See which answers need work.</p>
     <p className="mt-4 text-lg font-medium text-primary">Feeling worried is normal. We have got you.</p>
     <div className="mt-7 flex flex-wrap gap-3"><CtaButton label="Start Preparing — 6 Interviews for $44" size="lg"/><CtaButton intent="free" label="Check My Documents Free" size="lg" className="border bg-surface text-primary hover:bg-sage-soft"/></div>
     <p className="mt-5 text-sm">One payment. Six AI interviews. A report after every interview.</p>
     <p className="mt-3 text-sm text-muted-foreground">Pakistan · English and Urdu. More countries and languages coming soon.</p>
    </div>
    <DepthCard><div className="rounded-3xl border bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold text-primary">Example Interview · fictional information</p>
      <h2 className="mt-4 font-display text-2xl font-semibold">A follow-up worth practising.</h2>
      <div className="mt-6 space-y-4">
       <div className="rounded-2xl bg-sage-soft p-4"><p className="text-sm font-semibold">AI interviewer</p><p className="mt-2">Your form says 12 days. You said three weeks. Which plan is correct?</p></div>
       <div className="rounded-2xl bg-surface-muted p-4"><p className="text-sm font-semibold">Example applicant</p><p className="mt-2">I changed the first draft. My current plan is 12 days.</p></div>
       <div className="rounded-2xl bg-sage-soft p-4"><p className="text-sm font-semibold">AI interviewer</p><p className="mt-2">Why did it change? Do your booking documents show the new dates?</p></div>
      </div><p className="mt-5 text-sm text-muted-foreground">Use your real information. Never invent an answer to match a document.</p>
    </div></DepthCard>
   </Container>
  </section>
  <section className="border-y bg-primary text-primary-foreground"><Container className="py-10"><h2 className="font-display text-3xl font-semibold">You may get one real interview. Practise before it.</h2><p className="mt-4 max-w-3xl text-lg">You have spent time, money and effort on your application. Give yourself six chances to practise before the interview that matters.</p></Container></section>
  <section id="how-it-helps" className="scroll-mt-24"><Container className="py-16">
   <SectionHeading eyebrow="Find it. Work on it." title="Know what can go wrong before the visa officer asks."/>
   <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{problems.map(([heading,text])=><article key={heading} className="lift-card rounded-2xl border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="mt-4 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
  </Container></section>
  <section className="bg-surface-muted"><Container className="py-16">
   <SectionHeading eyebrow="How it works" title="Let AI show you what you need to fix."/>
   <ol className="mt-8 grid gap-6 md:grid-cols-3">{[
    ["Check your documents","Upload your forms and supporting documents. Find missing details and information that may not match."],
    ["Try a practice interview","Answer questions from your own information. The AI asks follow-up questions when more detail is needed."],
    ["See what to improve","Read your report. Find answers that were clear, too long or different from your documents."],
   ].map(([heading,text],i)=><li key={heading}><p className="text-sm font-semibold text-primary">0{i+1}</p><h3 className="mt-3 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></li>)}</ol>
   <p className="mt-8 font-medium">Practise. Check your report. Fix your answers. Then practise again.</p>
  </Container></section>
  <Container className="grid items-center gap-10 py-16 lg:grid-cols-2">
   <div><h2 className="font-display text-3xl font-semibold">Your family knows your story. The interviewer does not.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Practising with family can help. But they already know you. Visa Prepper asks you to explain things from the start. It can ask more when an answer is not clear.</p></div>
   <div id="sample-report" className="scroll-mt-24 rounded-3xl border bg-surface p-7"><p className="text-sm font-semibold text-primary">Sample Report · fictional example</p><h2 className="mt-3 font-display text-2xl font-semibold">Finish knowing what to work on.</h2><p className="mt-4">Your first answer did not match the dates in your form. Check the correct dates and follow the official correction steps.</p><ul className="mt-5 space-y-3">{["Clear answer","Answer too long","More detail needed","Does not match your document","Follow-up question was not answered"].map(text=><li key={text} className="rounded-lg bg-sage-soft px-4 py-3 text-sm">{text}</li>)}</ul></div>
  </Container>
  <Testimonials/><SurveyResult/>
  <section id="pricing" className="scroll-mt-24"><Container className="py-16"><SectionHeading eyebrow="One simple package" title="Six interviews. Time to improve." description="For $44, give yourself six chances to practise. No monthly subscription."/><div className="mt-9"><Pricing/></div></Container></section>
  <section id="destinations" className="bg-surface-muted"><Container className="py-14"><SectionHeading eyebrow="More than student interviews" title="Prepare for the plans that matter to you." description="Students, visitors, workers, business travellers, dependants and family applicants. Choose a supported route for your own case."/><div className="mt-7"><DestinationGrid/></div><Link href="/visa-types" className="mt-6 inline-flex items-center gap-2 font-semibold underline">See visa types <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link></Container></section>
  <section id="languages"><Container className="py-14"><SectionHeading eyebrow="Closer to home" title="Practise in words you understand." description="Pakistan: English and Urdu. India, Bangladesh, Hindi and Bengali are coming soon."/><div className="mt-8"><LanguageWelcome/></div></Container></section>
  <AndroidApp/>
  <section><Container className="py-14"><SectionHeading eyebrow="Free guides" title="Start with the question worrying you."/><div className="mt-7 grid gap-4 md:grid-cols-3">{[
   ["visa-interview-nervous-forget-answer","What if I go blank?"],
   ["f1-visa-interview-who-will-pay","How do I explain who will pay?"],
   ["visa-interview-follow-up-questions","What if there is a follow-up question?"]
  ].map(([slug,label])=><Link href={`/blog/${slug}`} key={slug} className="rounded-2xl border bg-surface p-6 font-semibold hover:border-primary">{label} →</Link>)}</div><Link href="/blog" className="mt-6 inline-block underline">All free guides for Pakistan, India and Bangladesh</Link></Container></section>
  <section className="bg-sage-soft"><Container className="py-14"><h2 className="max-w-3xl font-display text-3xl font-semibold">Help your applicants prepare. Earn when they join Visa Prepper.</h2><p className="mt-4 max-w-2xl text-lg">Do you help visa applicants or create visa content? Apply to become a partner. Earn commission on eligible paid referrals.</p><div className="mt-6"><LinkButton href="/partners/apply">Apply to Become a Partner</LinkButton></div></Container></section>
  <section id="faq" className="scroll-mt-24"><Container className="grid gap-8 py-16 lg:grid-cols-[1fr_1.5fr]"><SectionHeading eyebrow="Before you begin" title="A few things to know."/><FAQAccordion items={HOMEPAGE_FAQ}/></Container></section>
  <section className="bg-primary text-primary-foreground"><Container className="py-16 text-center"><h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold sm:text-4xl">Do not wait for the real interview to find your weak answers.</h2><p className="mt-5 text-lg">Check your documents. Practise six times. Know what to fix.</p><div className="mt-7"><CtaButton label="Start Preparing — $44" size="lg" className="bg-primary-foreground text-primary hover:bg-white"/></div><p className="mt-5 text-sm">We help you prepare. The visa authority makes the final decision.</p></Container></section>
 </>;
}
