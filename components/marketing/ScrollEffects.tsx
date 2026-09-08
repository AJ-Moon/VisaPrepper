"use client";

import { useRef, type ReactNode } from "react";
import { LazyMotion, domAnimation, m, useScroll, useSpring, useTransform } from "motion/react";
import { useShouldSimplifyMotion } from "@/lib/hooks/useShouldSimplifyMotion";

// Keep all content visible in server HTML and without JavaScript.
// Motion adds only a small translation; it never gates reading or scrolling.
export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const simplify = useShouldSimplifyMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className={className} initial={false}
        whileInView={simplify ? undefined : { y: [18, 0] }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function DepthCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const simplify = useShouldSimplifyMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 75, damping: 26 });
  const rotateX = useTransform(progress, [0, 1], [5, -5]);
  const rotateY = useTransform(progress, [0, 1], [-6, 6]);
  const y = useTransform(progress, [0, 1], [14, -14]);
  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <LazyMotion features={domAnimation} strict>
        <m.div className="depth-card" style={simplify ? undefined : { rotateX, rotateY, y, transformStyle: "preserve-3d" }}>
          {children}
        </m.div>
      </LazyMotion>
    </div>
  );
}
