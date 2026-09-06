import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroScrollStory } from "@/components/hero/HeroScrollStory";
import { GenericQuestionList } from "@/components/marketing/GenericQuestionList";
import { AdaptiveFollowUpFlow } from "@/components/marketing/AdaptiveFollowUpFlow";
import { StepCard } from "@/components/marketing/StepCard";
import { ApplicationCardMock } from "@/components/hero/ApplicationCardMock";
import { InterviewInterfaceMock } from "@/components/hero/InterviewInterfaceMock";
import { InterviewReportMock } from "@/components/hero/InterviewReportMock";
import { ProgressTimelineMock } from "@/components/marketing/ProgressTimelineMock";
import { FeatureSection } from "@/components/marketing/FeatureSection";
import { ConsistencyCheckVisual } from "@/components/marketing/ConsistencyCheckVisual";
import { FeedbackExampleCard } from "@/components/marketing/FeedbackExampleCard";
import { CommunicationMetricsGrid } from "@/components/marketing/CommunicationMetricsGrid";
import { VisualCoachingChecklist } from "@/components/marketing/VisualCoachingChecklist";
import { PracticeVsMockCompare } from "@/components/marketing/PracticeVsMockCompare";
import { VisaTypeCard } from "@/components/marketing/VisaTypeCard";
import { LanguageAvailabilityGrid } from "@/components/marketing/LanguageAvailabilityGrid";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { VISA_TYPES, CTA_SECONDARY_LABEL } from "@/lib/config/site";
import { HOMEPAGE_FAQ } from "@/lib/content/faq";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "VisaPrepper — Practice Your Real Visa Interview, Not Generic Questions",
    description:
      "VisaPrepper builds realistic AI mock visa interviews around your own application and circumstances, with adaptive follow-up questions and detailed feedback — for B1/B2, F1, H1B, H4, J1 and family visa applicants across Pakistan, India and Bangladesh.",
    path: "/",
  }),
  title: { absolute: "VisaPrepper — Practice Your Real Visa Interview, Not Generic Questions" },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sage-soft/60 to-background">
        <Container className="pb-4 pt-16 text-center sm:pt-20">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Your visa application. Your answers. Your mock interview.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Practice with an AI interviewer that knows your case, asks realistic
            follow-up questions, checks your answers for consistency, and
            shows you what to improve before interview day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton label="Start Your Mock Interview" size="lg" />
            <LinkButton href="/how-it-works" variant="secondary" size="lg">
              {CTA_SECONDARY_LABEL}
            </LinkButton>
          </div>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">U.S. Visa Preparation</p>
            <p>B1/B2 &middot; F1 &middot; H1B &middot; H4 &middot; J1 &middot; Family</p>
            <p>Pakistan &middot; India &middot; Bangladesh</p>
            <p className="flex flex-wrap items-center justify-center gap-x-2">
              <span>English</span>
              <span aria-hidden="true">&middot;</span>
              <span lang="ur" dir="rtl">اردو</span>
              <span aria-hidden="true">&middot;</span>
              <span lang="hi">हिन्दी</span>
              <span aria-hidden="true">&middot;</span>
              <span lang="bn">বাংলা</span>
            </p>
          </div>
        </Container>

        <HeroScrollStory />
      </section>

      {/* Problem */}
      <section className="bg-surface-muted">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Why generic prep falls short"
            title="Generic visa questions don't prepare you for questions about your case."
            description="Question lists are useful for understanding common topics. But every applicant has different education, travel history, funding, employment, sponsors, relatives, and personal circumstances — including previous refusals. Your preparation should reflect that, not a script written for someone else."
          />
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex justify-center">
              <GenericQuestionList />
            </div>
            <div className="flex justify-center">
              <AdaptiveFollowUpFlow />
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From your application to a real practice interview"
            description="Four steps connect your circumstances to a realistic interview, and your interview to specific, actionable feedback."
          />
          <div className="mt-8 divide-y divide-border">
            <StepCard
              number={1}
              title="Tell us about your visa application"
              description="Share the details that matter for your case — visa type, purpose of travel, program or job, funding and sponsor, employment, family, travel history, and any previous refusals."
              media={<ApplicationCardMock />}
            />
            <StepCard
              number={2}
              title="Take a realistic AI mock interview"
              description="VisaPrepper conducts a live voice/video interview and asks adaptive follow-up questions based on your visa type, your profile, and your previous answers."
              media={<InterviewInterfaceMock />}
            />
            <StepCard
              number={3}
              title="Get detailed feedback"
              description="See what you answered well, what was weak or incomplete, any inconsistencies worth addressing, and how you communicated — pace, filler words, pauses, and more."
              media={<InterviewReportMock />}
            />
            <StepCard
              number={4}
              title="Practice again and improve"
              description="Revisit weak areas, take another mock interview, and track how your answers and delivery improve session over session."
              media={<ProgressTimelineMock />}
            />
          </div>
        </Container>
      </section>

      {/* Feature sections */}
      <div id="features">
        <FeatureSection
          eyebrow="Application-grounded interviews"
          title="Your interview starts with your application — not a random question bank."
          description="VisaPrepper generates its questions around your circumstances: your visa type, your program or role, your funding, and everything else you've shared — so practice actually resembles your real interview."
          bullets={[
            "Built from your visa type and personal details",
            "No generic, one-size-fits-all script",
            "Updates as you add more about your case",
          ]}
          media={<ApplicationCardMock />}
        />
        <FeatureSection
          tone="muted"
          reverse
          eyebrow="Adaptive follow-up questions"
          title="A conversation, not a questionnaire."
          description="When an answer is unclear or incomplete, VisaPrepper follows up — the same way a real interviewer would — instead of moving on to the next fixed question."
          bullets={[
            "Listens for missing or unclear detail",
            "Follows up only when it matters",
            "Moves on once your answer is clear",
          ]}
          media={<AdaptiveFollowUpFlow />}
        />
        <FeatureSection
          eyebrow="Consistency checking"
          title="Notice when your own answers don't line up."
          description="VisaPrepper compares what's in your application against your earlier and later answers, and flags anything worth clarifying — so you can address it before interview day, not during it."
          bullets={[
            "Compares your application, earlier answers, and later answers",
            "Flags details worth clarifying — not accusations",
            "Helps you explain your case consistently",
          ]}
          media={<ConsistencyCheckVisual />}
        />
        <FeatureSection
          tone="muted"
          reverse
          eyebrow="Evidence-based feedback"
          title="Feedback that explains why, not just a score."
          description="Instead of a single number, VisaPrepper shows you exactly what your answer covered and what it left out, so you know what to add and why it matters."
          bullets={[
            "Shows what you said and what was missing",
            "Explains the reasoning behind each note",
            "No mysterious single score to interpret",
          ]}
          media={<FeedbackExampleCard />}
        />
        <FeatureSection
          eyebrow="Communication analysis"
          title="See where you hesitate, pause, or overuse filler words."
          description="VisaPrepper measures the things that affect how clearly you come across — pace, pauses, filler words, and timing — so you can work on delivery, not just content."
          bullets={[
            "Speaking pace and answer duration",
            "Filler words, repeated words, and long pauses",
            "Response timing and background audio quality",
          ]}
          media={<CommunicationMetricsGrid />}
        />
        <FeatureSection
          tone="muted"
          reverse
          eyebrow="Visual coaching"
          title="Simple, practical camera feedback."
          description="VisaPrepper checks the basics that make a video interview feel professional — like whether your face was visible and how you framed your shot — nothing more."
          bullets={[
            "Was your face clearly visible?",
            "Was your framing appropriate?",
            "Were you generally facing forward?",
          ]}
          media={<VisualCoachingChecklist />}
        />
        <FeatureSection
          eyebrow="Practice mode & mock interviews"
          title="Work on weak spots, then rehearse the real thing."
          description="Use Practice Mode to focus on specific areas with room to pause and reflect. When you're ready, take a Realistic Mock Interview that runs straight through, like interview day."
          bullets={[
            "Practice Mode: coaching-style, one area at a time",
            "Mock Interview: uninterrupted, report afterward",
            "Helps you build clear, truthful, consistent answers",
          ]}
          media={<PracticeVsMockCompare />}
        />
        <FeatureSection
          tone="muted"
          reverse
          eyebrow="Progress"
          title="See what improved — and what to practice next."
          description="Every session is saved, so you can look back at earlier interviews, see what's gotten stronger, and know exactly what to focus on before your next practice round."
          bullets={[
            "Compare sessions over time",
            "See what's improved and what still needs work",
            "Get a clear focus for your next practice session",
          ]}
          media={<ProgressTimelineMock />}
        />
      </div>

      {/* Visa types */}
      <section id="visa-types" className="bg-surface-muted">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Visa types"
            title="Practice for your U.S. visa interview"
            description="Each visa type has its own topics, documents, and typical lines of questioning. VisaPrepper adapts to yours."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISA_TYPES.map((visaType) => (
              <VisaTypeCard key={visaType.slug} visaType={visaType} />
            ))}
          </div>
        </Container>
      </section>

      {/* South Asia */}
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Built for South Asia"
            title="Built for applicants across South Asia"
            description="Visa interviews are stressful enough. Your preparation shouldn't be. VisaPrepper makes realistic interview practice accessible to applicants across Pakistan, India, and Bangladesh."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium text-foreground">
            <span className="rounded-full border border-border bg-surface px-4 py-2">🇵🇰 Pakistan</span>
            <span className="rounded-full border border-border bg-surface px-4 py-2">🇮🇳 India</span>
            <span className="rounded-full border border-border bg-surface px-4 py-2">🇧🇩 Bangladesh</span>
          </div>
          <LanguageAvailabilityGrid className="mt-6" />
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-surface-muted">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Trust & safety"
            title="Preparation — not predictions."
            description="VisaPrepper helps you practice and understand your answers. It does not decide visa eligibility or predict embassy decisions — only the relevant government authority does that."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> What VisaPrepper does
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>Builds mock interviews around your real application</li>
                <li>Asks adaptive, conversational follow-up questions</li>
                <li>Flags inconsistencies worth clarifying</li>
                <li>Analyzes your delivery — pace, pauses, filler words</li>
                <li>Gives specific, evidence-based feedback</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-danger">
                <XCircle className="h-4 w-4" aria-hidden="true" /> What VisaPrepper doesn&rsquo;t do
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>Doesn&rsquo;t guarantee visa approval or interview success</li>
                <li>Doesn&rsquo;t calculate an approval or refusal probability</li>
                <li>Doesn&rsquo;t perform lie or emotion detection</li>
                <li>Doesn&rsquo;t score nervousness or trustworthiness</li>
                <li>Isn&rsquo;t the U.S. Department of State, USCIS, or an embassy</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq">
        <Container className="py-16 sm:py-20">
          <SectionHeading align="center" eyebrow="FAQ" title="Common questions" />
          <div className="mx-auto mt-10 max-w-2xl">
            <FAQAccordion items={HOMEPAGE_FAQ} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Don't just practice visa questions. Practice your interview."
        description="Build a mock interview around your application, answer realistic follow-ups, and find out what you should improve before interview day."
      />
    </>
  );
}
