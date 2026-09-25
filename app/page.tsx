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
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { HOMEPAGE_FAQ } from "@/lib/content/faq";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildSoftwareApplicationJsonLd, buildWebsiteJsonLd } from "@/lib/seo/json-ld";
const title = "AI Video Visa Interview Practice | Visa Prepper";
export const metadata = {...buildPageMetadata({title,description:"Practice a complete AI video visa interview based on your own forms and personal details. Get document checks, personalised tips, results and confidence scores.",path:"/"}),title:{absolute:title}};
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
 ["Document verification check","Check whether your forms are filled correctly and find missing or conflicting details."],
 ["Full AI video interview","Face an AI interviewer on camera in a realistic interview based on your own form and personal details."],
 ["Personalised practice tips","Get simple advice based on the answers and weak areas found in your interview."],
 ["Results and scores","See problems in your answers, confidence and consistency so you know exactly what to improve."],
];
const proofPoints = [
 ["6", "complete AI video interviews"],
 ["3", "languages available now"],
 ["10", "document verification checks"],
 ["1", "clear report after every interview"],
];
export default function Home() {
 return <>
  <JsonLd data={buildSoftwareApplicationJsonLd()}/><JsonLd data={buildWebsiteJsonLd()}/>
  <section className="hero-grid relative overflow-hidden border-b bg-background">
   <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-sage-soft/80 blur-3xl" aria-hidden="true"/>
   <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
    <div>
     <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary"><span className="h-0.5 w-9 bg-primary" aria-hidden="true"/>AI video visa interview practice</p>
     <h1 className="mt-6 max-w-2xl font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
      <span className="block">Practice the interview.</span>
      <span className="mt-2 block">Fix weak answers.</span>
      <span className="mt-2 block text-primary">Walk in prepared.</span>
     </h1>
     <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Face a complete AI video interview that feels like the real visa interview. The questions and follow-ups come from your own form, documents and personal details.</p>
     <p className="mt-4 text-lg font-semibold text-primary">See exactly what to improve before the interview that matters.</p>
     <div className="mt-7 flex flex-wrap gap-3"><CtaButton label="Start Preparing — 6 Interviews for $44" size="lg"/><CtaButton intent="free" label="Check My Documents Free" size="lg" className="border bg-surface text-primary hover:bg-sage-soft"/></div>
     <p className="mt-5 text-sm font-medium">One payment. Six complete AI video interviews. A report after every interview.</p>
     <p className="mt-3 text-sm text-muted-foreground">English, Urdu and Hindi · U.S., UK, France, Italy, Germany and Schengen routes available.</p>
    </div>
    <ProductDemoVideo />
   </Container>
   <div className="relative border-t bg-surface/90 backdrop-blur-sm">
    <Container className="grid grid-cols-2 lg:grid-cols-4">
     {proofPoints.map(([value,label],index)=><div key={label} className={`py-6 sm:py-8 ${index%2===1?"border-l":""} ${index>1?"border-t lg:border-t-0":""} lg:border-l lg:first:border-l-0`}><div className="px-4 sm:px-7"><p className="font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl">{value}</p><p className="mt-1 max-w-40 text-sm leading-snug text-muted-foreground">{label}</p></div></div>)}
    </Container>
   </div>
  </section>
  <section id="features" className="scroll-mt-24"><Container className="py-16">
   <SectionHeading eyebrow="Everything in one place" title="Prepare your documents, your answers and your confidence." description="Visa Prepper helps before, during and after your practice interview."/>
   <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([heading,text])=><article key={heading} className="lift-card rounded-2xl border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true"/><h2 className="mt-4 text-xl font-semibold">{heading}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
  </Container></section>
  <section id="how-it-helps" className="scroll-mt-24"><Container className="py-16">
   <SectionHeading eyebrow="Find it. Work on it." title="Know what can go wrong before the visa officer asks."/>
   <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{problems.map(([heading,text])=><article key={heading} className="lift-card rounded-2xl border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true"/><h3 className="mt-4 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
  </Container></section>
  <section className="bg-surface-muted"><Container className="py-16">
   <SectionHeading eyebrow="How it works" title="A complete video interview, not just microphone practice." titleClassName="font-sans tracking-tight"/>
   <ol className="mt-8 grid gap-6 md:grid-cols-3">{[
    ["Check your documents","Follow your personalised checklist, then check whether your forms are filled correctly and whether important details match."],
    ["Join a realistic AI video interview","Use your camera and microphone. The AI interviewer asks questions and follow-ups based on your own form and personal details."],
    ["See your scores and next steps","Find answer problems, confidence problems and inconsistencies. Use your personalised tips before practicing again."],
   ].map(([heading,text],i)=><li key={heading}><p className="text-sm font-semibold text-primary">0{i+1}</p><h3 className="mt-3 text-xl font-semibold">{heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></li>)}</ol>
   <p className="mt-8 font-medium">Practice. Check your report. Fix your answers. Then practice again.</p>
  </Container></section>
  <Container className="grid items-center gap-10 py-16 lg:grid-cols-2">
   <div><h2 className="font-display text-3xl font-semibold">Your family knows your story. The interviewer does not.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Practicing with family can help. But they already know you. Visa Prepper asks you to explain things from the start. It can ask more when an answer is not clear.</p></div>
   <div id="sample-report" className="scroll-mt-24 rounded-3xl border bg-surface p-7"><p className="text-sm font-semibold text-primary">Sample result · fictional example</p><h2 className="mt-3 font-display text-2xl font-semibold">Finish knowing what to work on.</h2><p className="mt-4">Your results show answer quality, confidence and consistency. See the exact problems to fix before your next video interview.</p><ul className="mt-5 space-y-3">{["Clear answer","Confidence needs work","Answer too long","Does not match your document","Follow-up question was not answered"].map(text=><li key={text} className="rounded-lg bg-sage-soft px-4 py-3 text-sm">{text}</li>)}</ul></div>
  </Container>
  <Testimonials/><SurveyResult/>
  <section id="pricing" className="scroll-mt-24"><Container className="py-16"><SectionHeading eyebrow="One simple package" title="Six interviews. Time to improve." description="For $44, give yourself six chances to practice. No monthly subscription."/><div className="mt-9"><Pricing/></div></Container></section>
  <section id="destinations" className="bg-surface-muted"><Container className="py-14"><SectionHeading eyebrow="More than student interviews" title="Prepare for the plans that matter to you." description="Students, visitors, workers, business travellers, dependants and family applicants. Choose a supported route for your own case."/><div className="mt-7"><DestinationGrid/></div><Link href="/visa-types" className="mt-6 inline-flex items-center gap-2 font-semibold underline">See visa types <ArrowRight className="h-4 w-4" aria-hidden="true"/></Link></Container></section>
  <section id="languages"><Container className="py-14"><SectionHeading eyebrow="Closer to home" title="Practice in words you understand." description="English, Urdu and Hindi are available now. Bengali is coming soon."/><div className="mt-8"><LanguageWelcome/></div></Container></section>
  <MobileApps/>
  <section><Container className="py-14"><SectionHeading eyebrow="Free guides" title="Start with the question worrying you."/><div className="mt-7 grid gap-4 md:grid-cols-3">{[
   ["visa-interview-nervous-forget-answer","What if I go blank?"],
   ["f1-visa-interview-who-will-pay","How do I explain who will pay?"],
   ["visa-interview-follow-up-questions","What if there is a follow-up question?"]
  ].map(([slug,label])=><Link href={`/blog/${slug}`} key={slug} className="rounded-2xl border bg-surface p-6 font-semibold hover:border-primary">{label} →</Link>)}</div><Link href="/blog" className="mt-6 inline-block underline">All free guides for Pakistan, India and Bangladesh</Link></Container></section>
  <section className="bg-sage-soft"><Container className="py-14"><h2 className="max-w-3xl font-display text-3xl font-semibold">Help your applicants prepare. Earn when they join Visa Prepper.</h2><p className="mt-4 max-w-2xl text-lg">Do you help visa applicants or create visa content? Apply to become a partner. Earn commission on eligible paid referrals.</p><div className="mt-6"><LinkButton href="/partners/apply">Apply to Become a Partner</LinkButton></div></Container></section>
  <section id="faq" className="scroll-mt-24"><Container className="grid gap-8 py-16 lg:grid-cols-[1fr_1.5fr]"><SectionHeading eyebrow="Before you begin" title="A few things to know."/><FAQAccordion items={HOMEPAGE_FAQ}/></Container></section>
  <section className="bg-primary text-primary-foreground"><Container className="py-16 text-center"><h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold sm:text-4xl">Do not wait for the real interview to find your weak answers.</h2><p className="mt-5 text-lg">Check your documents. Face the AI interviewer on video. Know what to fix.</p><div className="mt-7"><CtaButton label="Start Preparing — $44" size="lg" className="bg-primary-foreground text-primary hover:bg-white"/></div><p className="mt-5 text-sm">We help you prepare. The visa authority makes the final decision.</p></Container></section>
 </>;
}
