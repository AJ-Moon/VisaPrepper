import { AlertCircle, CheckCircle2, Gauge } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const TAGS = [
  { icon: CheckCircle2, label: "Consistent with application", tone: "text-primary bg-sage-soft" },
  { icon: AlertCircle, label: "Missing: sponsor's occupation", tone: "text-warning bg-warning-soft" },
  { icon: Gauge, label: "Answer was a little rushed", tone: "text-teal bg-teal-soft" },
];

export function AnalysisFlowMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5",
        className
      )}
    >
      <p className="text-sm font-semibold text-foreground">Reviewing your answer</p>
      <div className="mt-3 rounded-xl bg-surface-muted p-3 text-sm italic text-muted-foreground">
        “My father will fund my education.”
      </div>
      <div className="mt-3 space-y-2">
        {TAGS.map((tag) => (
          <div
            key={tag.label}
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium", tag.tone)}
          >
            <tag.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
}
