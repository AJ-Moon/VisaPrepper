import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pricing } from "@/components/marketing/Pricing";
import { Testimonials } from "@/components/marketing/Testimonials";
import { SurveyResult } from "@/components/marketing/SurveyResult";
import { DestinationGrid } from "@/components/marketing/DestinationGrid";
import { LanguageWelcome } from "@/components/marketing/LanguageWelcome";
import { MobileApps } from "@/components/marketing/MobileApps";
import { ProductDemoVideo } from "@/components/marketing/ProductDemoVideo";
import InterviewSamples from "@/components/marketing/InterviewSamples";
import DocumentSamples from "@/components/marketing/DocumentSamples";
import { HeroFixVisual } from "@/components/marketing/HeroFixVisual";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { HOMEPAGE_FAQ } from "@/lib/content/faq";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildSoftwareApplicationJsonLd, buildWebsiteJsonLd } from "@/lib/seo/json-ld";
const title = "VisaPrepper | AI Video Visa Interview Practice";
export const metadata = {...buildPageMetadata({title,description:"AI video visa interview practice and document checks for applicants from Pakistan and India. U.S. interviews: English, Urdu or Hindi; international: English.",path:"/"}),title:{absolute:title}};
const problems = [
 ["Scared you will go blank?","Practice answering out loud. Get used to explaining your plans."],
 ["Not sure what to say?","Work on clear answers about your trip, studies, job, money or family."],
 ["Do your answers match your form?","Find details that are missing, different or hard to explain."],
 ["Worried about follow-up questions?","Practice the questions that may come after your first answer."],
 ["Do you speak for too long?","Learn to answer the question clearly, without losing the main point."],
 ["Is your confidence low?","Try a serious practice interview before the real day."],
];
const features = [
 ["Personalised document checklist","Know which documents to prepare for your visa route and situation."],
 ["Document review","Compare selected documents and saved answers. See missing, unclear or conflicting details with the evidence and a next step."],
 ["Full AI video interview","Face an AI interviewer on camera in a realistic interview based on your own form and personal details."],
 ["Personalised practice tips","Get simple advice based on the answers and weak areas found in your interview."],
 ["Results and scores","See where spoken answers need clarification, which facts need explaining and what to prepare next."],
];
const proofPoints = [
 ["6", "complete AI video interviews"],
 ["90", "days to use the paid package"],
 ["10", "document checks"],
 ["$44", "USD · one-time package"],
];
export default function Home() {
 return <>
  <JsonLd data={buildSoftwareApplicationJsonLd()}/><JsonLd data={buildWebsiteJsonLd()}/>
  <section className="hero-grid relative overflow-hidden border-b bg-background">
   <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-sage-soft/80 blur-3xl" aria-hidden="true"/>
   <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
    <div>
     <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary"><span className="h-0.5 w-9 shrink-0 bg-primary" aria-hidden="true"/>VisaPrepper · AI video visa interview practice</p>
     <h1 className="mt-6 max-w-2xl font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
      <span className="block">Prepare for your</span>
      <span className="mt-2 block text-primary">visa interview.</span>
     </h1>
     <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Start with a free document review. Spot conflicting answers and figures that need explaining, then prepare for the follow-up questions about your plans and funding.</p>
     <p className="mt-4 text-lg font-semibold text-primary">Make your next answer clearer.</p>
     <div className="mt-7 flex flex-wrap gap-3"><CtaButton intent="free" label="Check my documents free" size="lg"/><CtaButton label="Explore interview practice" size="lg" className="border bg-surface text-primary hover:bg-sage-soft"/></div>
     <p className="mt-5 text-sm font-medium">Your first document Check costs $0. Optional profile details can wait; required route facts still apply.</p>
     <Link href="/#sample-report" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Explore sample document report <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link>
     <p className="mt-3 text-sm text-muted-foreground">Review route and language availability in the app. Interview purchasing is not available yet.</p>
    </div>
    <HeroFixVisual />
   </Container>
   <div className="relative border-t bg-surface/90 backdrop-blur-sm">
    <Container className="grid grid-cols-2 lg:grid-cols-4">
     {proofPoints.map(([value,label],index)=><div key={label} className={`py-6 sm:py-8 ${index%2===1?"border-l":""} ${index>1?"border-t lg:border-t-0":""} lg:border-l lg:first:border-l-0`}><div className="px-4 sm:px-7"><p className="font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl">{value}</p><p className="mt-1 max-w-40 text-sm leading-snug text-muted-foreground">{label}</p></div></div>)}
    </Container>
   </div>
  </section>
  <section className="border-b bg-surface-muted" aria-label="Visa Prepper AI video interview demonstration">
   <Container className="py-12 sm:py-20"><div className="mx-auto max-w-5xl"><ProductDemoVideo /></div></Container>
  </section>
  <DocumentSamples showcase />
  <InterviewSamples />
  <section id="features" className="scroll-mt-24 bg-surface"><Container className="py-14 sm:py-20">
   <SectionHeading eyebrow="Everything in one place" title="Prepare your documents, your answers and your confidence." description="VisaPrepper, also written Visa Prepper, brings document checks and a full AI video interview into one place."/>
   <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([heading,text])=><article key={heading} className="home-enter lift-card rounded-2xl border bg-background p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true"/><h2 className="mt-4 text-xl font-semibold">{heading}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
   <Link href="/visa-interview-practice" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">Explore AI visa interview practice <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link>
  </Container></section>
  <section id="how-it-helps" className="scroll-mt-24 border-y bg-sage-soft"><Container className="py-14 sm:py-20">
   <SectionHeading eyebrow="Room to improve" title="A weak answer today gives you something to work on." description="You can pause after a practice interview, read your report and prepare a clearer answer for the next one."/>
   <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{problems.map(([heading,text])=><article key={heading} className="home-enter lift-card rounded-2xl border border-primary/10 bg-surface p-6 shadow-sm shadow-primary/10"><span className="inline-flex rounded-xl bg-sage-soft p-2.5"><Check className="size-5 text-primary" aria-hidden="true"/></span><h3 className="mt-4 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
  </Container></section>
  <section className="bg-surface"><Container className="py-14 sm:py-20">
   <SectionHeading eyebrow="How it works" title="A complete video interview, not just microphone practice." titleClassName="font-sans tracking-tight"/>
   <ol className="mt-8 grid gap-6 md:grid-cols-3">{[
    ["Check your documents","Select your visa route and required facts, then review a document bundle. You can complete optional profile details later."],
    ["Join a realistic AI video interview","Use your camera and microphone. The AI interviewer asks questions and follow-ups based on your own form and personal details."],
    ["See your scores and next steps","Connect your spoken answers to the feedback, check your facts and prepare a clearer explanation before practicing again."],
   ].map(([heading,text],i)=><li key={heading} className="home-enter border-t border-primary/20 pt-5"><p className="inline-flex rounded-full bg-sage-soft px-3 py-1 text-sm font-semibold tabular-nums text-primary">0{i+1}</p><h3 className="mt-3 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></li>)}</ol>
   <p className="mt-8 font-medium">Your first interview gives you a starting point. Your next one is a chance to use what you learned.</p>
  </Container></section>

  <Testimonials/><SurveyResult/>
  <section id="pricing" className="scroll-mt-24 border-y bg-gradient-to-b from-background to-sage-soft/55"><Container className="py-14 sm:py-20"><SectionHeading eyebrow="Start small" title="Check your documents free. Decide what comes next." description="Choose six AI video interviews for $44 when you want more practice. One payment, with 90 days to use your package."/><div className="mt-9 [&_article]:shadow-sm [&_article]:shadow-primary/10"><Pricing/></div></Container></section>
  <section id="destinations" className="bg-surface-muted"><Container className="py-14"><SectionHeading eyebrow="More than student interviews" title="Prepare for the plans that matter to you." description="Students, visitors, workers, business travellers, dependants and family applicants. Choose a supported route for your own case."/><div className="mt-7"><DestinationGrid/></div><Link href="/visa-types" className="mt-6 inline-flex items-center gap-2 font-semibold underline">See visa types <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link></Container></section>
  <section id="languages"><Container className="py-14"><SectionHeading eyebrow="Closer to home" title="Practice in words you understand." description="U.S. interviews support English, Urdu and Hindi. Supported international interviews are in English. Bengali and Bangladesh support are coming soon."/><div className="mt-8"><LanguageWelcome/></div></Container></section>
  <MobileApps/>
  <section><Container className="py-14"><SectionHeading eyebrow="Free guides" title="Start with the question worrying you."/><div className="mt-7 grid gap-4 md:grid-cols-3">{[
   ["visa-interview-nervous-forget-answer","What if I go blank?"],
   ["f1-visa-interview-who-will-pay","How do I explain who will pay?"],
   ["visa-interview-follow-up-questions","What if there is a follow-up question?"]
  ].map(([slug,label])=><Link href={`/blog/${slug}`} key={slug} className="rounded-2xl border bg-surface p-6 font-semibold hover:border-primary">{label} →</Link>)}</div><Link href="/blog" className="mt-6 inline-block underline">All free guides for Pakistan, India and Bangladesh</Link></Container></section>
  <section className="bg-sage-soft"><Container className="py-14"><h2 className="max-w-3xl font-display text-3xl font-semibold">Help your applicants prepare. Earn when they join Visa Prepper.</h2><p className="mt-4 max-w-2xl text-lg">Do you help visa applicants or create visa content? Apply to become a partner. Earn commission on eligible paid referrals.</p><div className="mt-6"><LinkButton href="/partners/apply">Apply to Become a Partner</LinkButton></div></Container></section>
  <section id="faq" className="scroll-mt-24"><Container className="grid gap-8 py-16 lg:grid-cols-[1fr_1.5fr]"><SectionHeading eyebrow="Before you begin" title="A few things to know."/><FAQAccordion items={HOMEPAGE_FAQ}/></Container></section>
  <section className="home-forest text-primary-foreground"><Container className="py-16 text-center sm:py-24"><h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold sm:text-4xl">Take one free step toward feeling prepared.</h2><p className="mx-auto mt-5 max-w-2xl text-lg">Check your documents today. Choose interview practice when you are ready. You do not need perfect answers to begin.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><CtaButton intent="free" label="Check my documents free" size="lg" className="bg-primary-foreground text-primary hover:bg-white"/><LinkButton href="/#sample-report" variant="outline" size="lg" className="border-primary-foreground/40 text-primary-foreground hover:bg-white/10">Explore sample document report</LinkButton></div><p className="mt-5 text-sm">One free document check. Paid video interviews are optional. The visa authority makes the final decision.</p></Container></section>
 </>;
}
