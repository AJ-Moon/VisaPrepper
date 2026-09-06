import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const ROWS: { label: string; rating: "Strong" | "Getting there" | "Needs work"; width: string }[] = [
  { label: "Clarity of answers", rating: "Strong", width: "88%" },
  { label: "Consistency with application", rating: "Strong", width: "82%" },
  { label: "Level of detail", rating: "Needs work", width: "45%" },
  { label: "Speaking pace", rating: "Getting there", width: "64%" },
];

const RATING_TONE: Record<string, string> = {
  Strong: "bg-primary",
  "Getting there": "bg-teal",
  "Needs work": "bg-warning",
};

export function InterviewReportMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Interview Report</p>
        <Badge tone="neutral">Practice #3</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {ROWS.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium text-foreground">{row.rating}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={cn("h-full rounded-full", RATING_TONE[row.rating])}
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-sage-soft px-3 py-2.5 text-xs text-foreground">
        <span className="font-semibold">Top area to improve: </span>
        Explain your sponsor&rsquo;s occupation and finances in more detail.
      </div>
    </div>
  );
}
