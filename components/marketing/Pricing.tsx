import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { COMPLETE_OFFER } from "@/lib/config/offer";
import { CtaButton } from "@/components/layout/CtaButton";
export function Pricing() {
  return <div>
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      <article className="flex flex-col rounded-3xl border bg-surface p-7 sm:p-9">
        <p className="text-sm font-semibold text-primary">Your first step</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">Free</h3>
        <p className="mt-3 text-muted-foreground">Find document problems before you pay.</p>
        <p className="mt-6 text-5xl font-semibold">$0 <span className="text-base font-normal">USD</span></p>
        <ul className="my-7 flex-1 space-y-4">{["1 document check, once only", "Free preparation guides", "Sample interview report"].map(text => <li key={text} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/>{text}</li>)}<li className="flex gap-3 text-muted-foreground"><Minus className="mt-1 h-4 w-4 shrink-0" aria-hidden="true"/><span>No live AI interview</span></li></ul>
        <CtaButton intent="free" label="Check My Documents Free" size="lg"/>
        <Link href="/#sample-report" className="mt-4 text-center text-sm underline underline-offset-4">See the sample report</Link>
      </article>
      <article className="flex flex-col rounded-3xl border border-primary bg-sage-soft p-7 sm:p-9">
        <p className="text-sm font-semibold text-primary">Six chances to practise</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">{COMPLETE_OFFER.name}</h3>
        <p className="mt-3 text-muted-foreground">Practise your answers before the real interview.</p>
        <p className="mt-6 text-5xl font-semibold">$44 <span className="text-base font-normal">USD · one time</span></p>
        <ul className="my-7 flex-1 space-y-3">{["6 complete AI practice interviews", "Questions based on your application", "Follow-up questions based on your answers", "10 document checks, including revised documents", "A personal report after every interview", "Help with unclear, different or very long answers", "All currently supported interview types and languages", "90 days from purchase to use the package"].map(text => <li key={text} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true"/>{text}</li>)}</ul>
        <CtaButton label="Get 6 Interviews — $44" size="lg"/>
        <p className="mt-4 text-center text-sm">One payment. No monthly subscription.</p>
      </article>
    </div>
    <p className="mx-auto mt-6 max-w-3xl text-center text-base">Need more practice? Buy the same package again. Six interviews total—not six of each mode.</p>
    <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted-foreground">Document checks find missing or different details. They do not certify documents. Final currency and total are shown at checkout. <Link href="/terms" className="underline">Read the terms</Link>.</p>
  </div>;
}
