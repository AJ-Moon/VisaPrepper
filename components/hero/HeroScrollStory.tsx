"use client";

import { useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ApplicationCardMock } from "@/components/hero/ApplicationCardMock";
import { InterviewInterfaceMock } from "@/components/hero/InterviewInterfaceMock";
import { AnalysisFlowMock } from "@/components/hero/AnalysisFlowMock";
import { InterviewReportMock } from "@/components/hero/InterviewReportMock";
import { StaticStoryFallback } from "@/components/hero/StaticStoryFallback";
import { useShouldSimplifyMotion } from "@/lib/hooks/useShouldSimplifyMotion";
import { cn } from "@/lib/utils/cn";

const STAGES = [
  { label: "Your Application", Component: ApplicationCardMock },
  { label: "Adaptive AI Interview", Component: InterviewInterfaceMock },
  { label: "Your Answers Analyzed", Component: AnalysisFlowMock },
  { label: "Areas to Improve", Component: InterviewReportMock },
];

const OVERLAP = 0.07;
const SEGMENT = 1 / STAGES.length;

function stageRanges(index: number) {
  const start = index * SEGMENT;
  const end = start + SEGMENT;
  const isFirst = index === 0;
  const isLast = index === STAGES.length - 1;

  const enterStart = Math.max(0, start - OVERLAP);
  const enterEnd = Math.min(1, start + OVERLAP);
  const exitStart = Math.max(0, end - OVERLAP);
  const exitEnd = Math.min(1, end + OVERLAP);

  if (isFirst) {
    return {
      input: [0, exitStart, exitEnd],
      opacity: [1, 1, 0],
      y: [0, 0, -18],
      rotate: [0, 0, -3],
    };
  }
  if (isLast) {
    return {
      input: [enterStart, enterEnd, 1],
      opacity: [0, 1, 1],
      y: [18, 0, 0],
      rotate: [3, 0, 0],
    };
  }
  return {
    input: [enterStart, enterEnd, exitStart, exitEnd],
    opacity: [0, 1, 1, 0],
    y: [18, 0, 0, -18],
    rotate: [3, 0, 0, -3],
  };
}

function StoryStage({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const ranges = stageRanges(index);
  const opacity = useTransform(progress, ranges.input, ranges.opacity);
  const y = useTransform(progress, ranges.input, ranges.y);
  const rotateX = useTransform(progress, ranges.input, ranges.rotate);
  const Component = STAGES[index].Component;

  return (
    <m.div
      style={{ opacity, y, rotateX }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <Component />
    </m.div>
  );
}

function StageIndicator({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    setActive(Math.min(STAGES.length - 1, Math.floor(value * STAGES.length)));
  });

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {STAGES.map((stage, index) => (
        <div key={stage.label} className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === active ? "w-6 bg-primary" : "w-1.5 bg-border"
            )}
          />
        </div>
      ))}
      <span className="ms-2 text-xs font-medium text-muted-foreground" aria-live="polite">
        {STAGES[active].label}
      </span>
    </div>
  );
}

function AnimatedHeroStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.5 });

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={containerRef} className="relative h-[280vh]">
        <div className="sticky top-24 flex h-[calc(100vh-7rem)] flex-col items-center justify-center">
          <div className="relative h-[420px] w-full max-w-sm" style={{ perspective: 1200 }}>
            {STAGES.map((stage, index) => (
              <StoryStage key={stage.label} progress={progress} index={index} />
            ))}
          </div>
          <StageIndicator progress={progress} />
        </div>
      </div>
    </LazyMotion>
  );
}

export function HeroScrollStory() {
  const shouldSimplify = useShouldSimplifyMotion();

  if (shouldSimplify) {
    return (
      <div className="py-6">
        <StaticStoryFallback />
      </div>
    );
  }

  return <AnimatedHeroStory />;
}
