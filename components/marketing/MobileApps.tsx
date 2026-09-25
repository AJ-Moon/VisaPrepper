import Image from "next/image";
import { Apple, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DepthCard, ScrollReveal } from "@/components/marketing/ScrollEffects";

export function MobileApps() {
  return (
    <section id="mobile-apps" className="scroll-mt-24 overflow-hidden bg-sage-soft/60">
      <Container className="grid items-center gap-10 py-14 sm:py-16 md:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal>
          <p className="text-sm font-semibold text-primary">Your preparation, on your phone</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">Visa Prepper mobile apps are coming soon.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">Practise on Android or iPhone wherever you feel ready. The web app is available now; the Google Play and Apple App Store apps are on the way.</p>
          <div className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/15 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Coming soon</p>
              <Image src="/images/brand/google-play.png" alt="Google Play" width={180} height={42} className="mt-3 h-auto w-[180px] max-w-full" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-white p-5">
              <Apple className="h-9 w-9 text-foreground" aria-hidden="true" />
              <div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Coming soon</p><p className="mt-1 text-lg font-semibold">Apple App Store</p></div>
            </div>
          </div>
        </ScrollReveal>
        <DepthCard className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[2rem] border border-primary/20 bg-primary p-3 shadow-2xl shadow-primary/20">
            <Image src="/images/brand/visaprepper.jpg" alt="Visa Prepper — Practice today. Travel tomorrow." width={1254} height={1254} sizes="(max-width: 768px) 85vw, 360px" className="h-auto w-full rounded-[1.4rem]" />
            <div className="relative mx-2 -mt-5 flex items-center justify-between rounded-xl border border-white/20 bg-background px-5 py-4 shadow-lg" style={{ transform: "translateZ(28px)" }}>
              <div><p className="text-sm font-semibold">Made for your next step.</p><p className="mt-1 text-xs text-muted-foreground">Android and iPhone apps coming soon</p></div>
              <Smartphone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            </div>
          </div>
        </DepthCard>
      </Container>
    </section>
  );
}
