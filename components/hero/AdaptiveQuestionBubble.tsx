import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function AdaptiveQuestionBubble({
  question,
  tag = "Adaptive follow-up",
  className,
}: {
  question: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl rounded-bl-sm border border-teal-soft bg-teal-soft/70 px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal">
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        {tag}
      </div>
      <p className="mt-1.5 text-sm text-foreground">{question}</p>
    </div>
  );
}
