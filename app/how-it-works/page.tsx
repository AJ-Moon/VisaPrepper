import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/marketing/StepCard";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { ApplicationCardMock } from "@/components/hero/ApplicationCardMock";
import { InterviewInterfaceMock } from "@/components/hero/InterviewInterfaceMock";
import { InterviewReportMock } from "@/components/hero/InterviewReportMock";
import { ProgressTimelineMock } from "@/components/marketing/ProgressTimelineMock";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "How VisaPrepper Works — Application-Grounded Mock Visa Interviews",
  description:
    "See how VisaPrepper turns your visa application into a realistic, adaptive mock interview, then into detailed feedback you can act on before interview day.",
  path: "/how-it-works",
});

const FAQS = [
  {
    question: "How long does a mock interview take?",
    answer:
      "Most mock interviews run similarly to a real visa interview — typically a short session focused on the core topics for your visa type, plus any adaptive follow-ups your answers prompt.",
  },
  {
    question: "Do I need a webcam and microphone?",
    answer:
      "Yes, for the full mock interview experience with visual coaching you'll want a camera and microphone, similar to what you'd use for any video call.",
  },
  {
    question: "What happens if I don't know how to answer something?",
    answer:
      "Answer as best you can, truthfully. VisaPrepper's feedback will show you where an answer was incomplete or unclear, so you know what to review before your real interview.",
  },
  {
    question: "Can I redo a mock interview?",
    answer:
      "Yes. You can take multiple mock interviews and practice sessions, and VisaPrepper tracks your sessions so you can see what's improved over time.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          align="center"
          eyebrow="How it works"
          title="From your application to a real practice interview"
          description="VisaPrepper connects four steps: understanding your case, interviewing you about it, analyzing your answers, and helping you improve. Here's what each step actually involves."
        />
      </Container>

      <Container className="pb-8">
        <div className="divide-y divide-border">
          <StepCard
            number={1}
            title="Tell us about your visa application"
            description="Start by sharing the details that shape your case: your visa type, purpose of travel, program or job, funding and sponsor, employment, family, travel history, U.S. relatives, accommodation, travel dates, and any previous refusals. The more accurately you describe your real circumstances, the more useful your practice interview will be — there's no benefit to exaggerating or leaving things out."
            media={<ApplicationCardMock />}
          />
          <StepCard
            number={2}
            title="Take a realistic AI mock interview"
            description="VisaPrepper conducts a live voice/video interview using your camera and microphone. Questions adapt to your visa type, your profile, your previous answers, and anything that seems unclear or inconsistent. The interview follows a simple pattern: ask, listen, understand, follow up when necessary, and move on — just like a real conversation, not a fixed questionnaire."
            media={<InterviewInterfaceMock />}
          />
          <StepCard
            number={3}
            title="Get detailed, evidence-based feedback"
            description="After the interview, VisaPrepper shows you what you answered well, which answers were weak or incomplete, any contradictions worth addressing, and which parts of your own application you should understand better. You'll also see communication feedback — speaking pace, filler words, long pauses, and answer duration — plus simple visual coaching notes about framing and camera presence."
            media={<InterviewReportMock />}
          />
          <StepCard
            number={4}
            title="Practice again and improve"
            description="Revisit the areas your feedback flagged, using Practice Mode to focus on one weak spot at a time, or take another full Realistic Mock Interview when you're ready. VisaPrepper keeps a record of your sessions so you can see what's improved and decide what to focus on next."
            media={<ProgressTimelineMock />}
          />
        </div>
      </Container>

      <section className="bg-surface-muted">
        <Container className="py-14 sm:py-16">
          <SectionHeading align="center" eyebrow="FAQ" title="Questions about the process" />
          <div className="mx-auto mt-10 max-w-2xl">
            <FAQAccordion items={FAQS} />
          </div>
        </Container>
      </section>

      <CTASection
        title="See it work with your own application"
        description="The best way to understand VisaPrepper is to try it with your real circumstances."
      />
    </>
  );
}
