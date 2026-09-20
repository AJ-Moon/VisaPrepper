import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DepthCard, ScrollReveal } from "@/components/marketing/ScrollEffects";

export function AndroidApp() {
  return (
    <section id="android" className="scroll-mt-24 overflow-hidden bg-sage-soft/60">
      <Container className="grid items-center gap-10 py-14 sm:py-16 md:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal>
          <p className="text-sm font-semibold text-primary">Your preparation, on your phone</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">A little practice.<br />Wherever you feel at home.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">Visa Prepper is available for Android on Google Play. Practise on your phone, wherever you feel ready.</p>
          <div className="mt-7 inline-flex flex-col items-start gap-3 rounded-2xl border border-primary/15 bg-white px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Available on</p>
            <Image src="/images/brand/google-play.png" alt="Google Play" width={180} height={42} className="h-auto w-[180px]" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">The direct Google Play link will be added here.</p>
        </ScrollReveal>
        <DepthCard className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[2rem] border border-primary/20 bg-primary p-3 shadow-2xl shadow-primary/20">
            <Image src="/images/brand/visaprepper.jpg" alt="Visa Prepper — Practice today. Travel tomorrow." width={1254} height={1254} sizes="(max-width: 768px) 85vw, 360px" className="h-auto w-full rounded-[1.4rem]" />
            <div className="relative mx-2 -mt-5 flex items-center justify-between rounded-xl border border-white/20 bg-background px-5 py-4 shadow-lg" style={{ transform: "translateZ(28px)" }}>
              <div><p className="text-sm font-semibold">Made for your next step.</p><p className="mt-1 text-xs text-muted-foreground">Visa Prepper for Android</p></div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            </div>
          </div>
        </DepthCard>
      </Container>
    </section>
  );
}
