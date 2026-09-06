import { Info } from "lucide-react";

export function DisclaimerCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-2xl border border-warning-soft bg-warning-soft/60 px-4 py-4 text-sm leading-relaxed text-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
