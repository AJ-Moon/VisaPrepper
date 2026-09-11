import { Check, Minus } from "lucide-react";
import { PLANS } from "@/lib/config/offering";
import type { PublicPlan } from "@/lib/config/live-offering";
import { CtaButton } from "@/components/layout/CtaButton";

export function Pricing({plans = [...PLANS]}:{plans?:PublicPlan[]}) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const featured = plan.id === "complete";
          const items = [
            { text: `${plan.checks ?? "Unlimited"} document ${plan.checks === 1 ? "check" : "checks"}${plan.price === 0 ? " — once only" : ""}`, included: true },
            { text: "Free preparation tips", included: true },
            { text: plan.interviews ? `${plan.interviews} realistic interviews` : "Realistic interviews", included: plan.interviews > 0 },
            { text: "Personal feedback after each interview", included: plan.personalized },
            { text: "Tips based on your answers", included: plan.personalized },
          ];
          return (
            <article key={plan.id} className={`lift-card relative flex flex-col rounded-3xl border p-6 sm:p-8 ${featured ? "border-primary bg-sage-soft" : "border-border bg-surface"}`}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary">{featured ? "More practice, more preparation" : plan.price === 0 ? "Your first step" : "Build your confidence"}</p>
              <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <p className="mt-6"><span className="text-5xl font-semibold tracking-tight">${plan.price}</span><span className="ml-2 text-sm text-muted-foreground">USD{plan.price > 0 ? " · one time" : " · free"}</span></p>
              <ul className="my-7 flex-1 space-y-4 text-sm">
                {items.map(({ text, included }) => (
                  <li key={text} className={`flex items-start gap-3 ${included ? "text-foreground" : "text-muted-foreground"}`}>
                    {included ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> : <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
                    <span>{!included && <span className="sr-only">Not included: </span>}<span className={included ? "" : "line-through decoration-muted-foreground/50"}>{text}</span></span>
                  </li>
                ))}
              </ul>
              <CtaButton label={plan.price === 0 ? "Check my documents free" : `Get started — $${plan.price}`} size="lg" className="w-full" />
            </article>
          );
        })}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">Every interview uses the same realistic, adaptive format, with personal feedback afterward. Choose a package for the number of interviews you need. You can update your documents and check again within your package allowance.</p>
      <p className="mx-auto mt-3 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">Document checks look for missing or conflicting details; they do not certify documents or guarantee acceptance. Continue to the app to get started.</p>
    </div>
  );
}
