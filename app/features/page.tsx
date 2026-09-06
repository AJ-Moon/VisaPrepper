import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureSection } from "@/components/marketing/FeatureSection";
import { CTASection } from "@/components/marketing/CTASection";
import { ApplicationCardMock } from "@/components/hero/ApplicationCardMock";
import { AdaptiveFollowUpFlow } from "@/components/marketing/AdaptiveFollowUpFlow";
import { ConsistencyCheckVisual } from "@/components/marketing/ConsistencyCheckVisual";
import { CommunicationMetricsGrid } from "@/components/marketing/CommunicationMetricsGrid";
import { VisualCoachingChecklist } from "@/components/marketing/VisualCoachingChecklist";
import { FeedbackExampleCard } from "@/components/marketing/FeedbackExampleCard";
import { PracticeVsMockCompare } from "@/components/marketing/PracticeVsMockCompare";
import { ProgressTimelineMock } from "@/components/marketing/ProgressTimelineMock";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "VisaPrepper Features — Adaptive Interviews, Consistency Checks & Feedback",
  description:
    "Explore VisaPrepper's features: application-grounded interviews, adaptive follow-up questions, consistency checking, evidence-based feedback, communication analysis, and visual coaching.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Features", path: "/features" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          align="center"
          eyebrow="Features"
          title="Everything that makes your practice feel like a real interview"
          description="VisaPrepper's features work together across three moments: before your interview, during it, and after — organized here so you can see how each one fits."
        />
      </Container>

      <Container>
        <p className="mx-auto max-w-2xl text-center text-sm font-semibold uppercase tracking-wide text-teal">
          Before your interview
        </p>
      </Container>
      <FeatureSection
        eyebrow="Application-grounded interviews"
        title="Your interview starts with your application — not a random question bank."
        description="Every question VisaPrepper asks is generated around your visa type and the circumstances you've shared, so your practice reflects your actual case from the very first question."
        bullets={[
          "Built from your visa type and personal details",
          "No generic, one-size-fits-all script",
          "Updates as you add more about your case",
        ]}
        media={<ApplicationCardMock />}
      />

      <Container className="pt-4">
        <p className="mx-auto max-w-2xl text-center text-sm font-semibold uppercase tracking-wide text-teal">
          During your interview
        </p>
      </Container>
      <FeatureSection
        tone="muted"
        reverse
        eyebrow="Adaptive follow-up questions"
        title="A conversation, not a questionnaire."
        description="When an answer is unclear or incomplete, VisaPrepper follows up — the same way a real interviewer would — instead of moving on to the next fixed question regardless of what you said."
        media={<AdaptiveFollowUpFlow />}
      />
      <FeatureSection
        eyebrow="Consistency checking"
        title="Notice when your own answers don't line up."
        description="VisaPrepper compares what's in your application against your earlier and later answers, and flags anything worth clarifying — not as an accusation, but as a chance to explain your case consistently."
        media={<ConsistencyCheckVisual />}
      />
      <FeatureSection
        tone="muted"
        reverse
        eyebrow="Communication analysis"
        title="See where you hesitate, pause, or overuse filler words."
        description="Alongside the content of your answers, VisaPrepper measures speaking pace, filler words, long pauses, answer duration, response timing, repeated words, hesitation markers, and background audio quality."
        media={<CommunicationMetricsGrid />}
      />
      <FeatureSection
        eyebrow="Visual coaching"
        title="Simple, practical camera feedback."
        description="VisaPrepper checks whether your face was clearly visible, whether your framing was appropriate, and whether you were generally facing forward — lightweight coaching, not emotion or identity analysis."
        media={<VisualCoachingChecklist />}
      />

      <Container className="pt-4">
        <p className="mx-auto max-w-2xl text-center text-sm font-semibold uppercase tracking-wide text-teal">
          After your interview
        </p>
      </Container>
      <FeatureSection
        tone="muted"
        reverse
        eyebrow="Evidence-based feedback"
        title="Feedback that explains why, not just a score."
        description="Instead of a single confusing number, VisaPrepper shows you exactly what your answer covered and what it left out, and explains why that detail matters for your case."
        media={<FeedbackExampleCard />}
      />
      <FeatureSection
        eyebrow="Practice mode & mock interviews"
        title="Work on weak spots, then rehearse the real thing."
        description="Use Practice Mode to focus on specific areas in a coaching-style environment. When you're ready, take a Realistic Mock Interview that runs straight through without interruptions, closer to interview day itself."
        media={<PracticeVsMockCompare />}
      />
      <FeatureSection
        tone="muted"
        reverse
        eyebrow="Progress"
        title="See what improved — and what to practice next."
        description="Every session is saved, so you can compare interviews over time, see what's gotten stronger, and know exactly what to focus on in your next practice session."
        media={<ProgressTimelineMock />}
      />

      <CTASection
        title="Try these features with your own case"
        description="The clearest way to understand VisaPrepper's features is to build a mock interview around your own application."
      />
    </>
  );
}
