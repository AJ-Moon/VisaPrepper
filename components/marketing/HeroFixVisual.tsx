import { Check, FileCheck2, Gauge, MessageSquareWarning, Sparkles, Video } from "lucide-react";

const fixes = [
  {
    icon: FileCheck2,
    label: "Form inconsistency",
    detail: "Form says Father · Answer says Uncle",
    action: "Check the correct detail",
  },
  {
    icon: MessageSquareWarning,
    label: "Answer problem",
    detail: "Your answer is long and misses the main point",
    action: "Make the answer clear",
  },
  {
    icon: Gauge,
    label: "Confidence problem",
    detail: "Confidence drops on follow-up questions",
    action: "Practice the weak area",
  },
];

export function HeroFixVisual() {
  return (
    <div className="hero-fix-shell relative overflow-hidden rounded-[2rem] bg-primary p-4 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-6">
      <div className="hero-fix-orb hero-fix-orb-one" aria-hidden="true" />
      <div className="hero-fix-orb hero-fix-orb-two" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-4 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em]">
          <span className="hero-fix-pulse h-2.5 w-2.5 rounded-full bg-[#8dd7aa]" aria-hidden="true" />
          AI interview review
        </div>
        <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold">LIVE ANALYSIS</span>
      </div>

      <div className="relative overflow-hidden rounded-[1.4rem] bg-[#fbf7f1] p-5 text-foreground sm:p-7">
        <div className="hero-fix-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Your interview report</p>
            <h2 className="mt-2 max-w-sm font-sans text-2xl font-semibold tracking-tight sm:text-3xl">What we find before your interview</h2>
          </div>
          <Sparkles className="mt-1 h-6 w-6 shrink-0 text-teal" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-3">
          {fixes.map(({ icon: Icon, label, detail, action }, index) => (
            <article key={label} className="hero-fix-card flex gap-3 rounded-2xl border bg-white p-4" style={{ animationDelay: `${index * 0.75}s` }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{label}</h3>
                  <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-warning">Needs work</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary"><Check className="h-3.5 w-3.5" aria-hidden="true" />{action}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-sage-soft p-4">
          <div>
            <p className="text-sm font-semibold text-primary">Personalised practice plan ready</p>
            <p className="mt-1 text-xs text-muted-foreground">Fix it, practice again and track improvement.</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-5 w-5" aria-hidden="true" /></span>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold sm:text-xs">
        <span className="rounded-xl border border-white/15 bg-white/5 px-2 py-3"><FileCheck2 className="mx-auto mb-1.5 h-4 w-4" aria-hidden="true" />Document check</span>
        <span className="rounded-xl border border-white/15 bg-white/5 px-2 py-3"><Video className="mx-auto mb-1.5 h-4 w-4" aria-hidden="true" />Video interview</span>
        <span className="rounded-xl border border-white/15 bg-white/5 px-2 py-3"><Gauge className="mx-auto mb-1.5 h-4 w-4" aria-hidden="true" />Results & scores</span>
      </div>
    </div>
  );
}
