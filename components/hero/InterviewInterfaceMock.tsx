import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { VoiceWaveform } from "@/components/hero/VoiceWaveform";
import { AdaptiveQuestionBubble } from "@/components/hero/AdaptiveQuestionBubble";
import { cn } from "@/lib/utils/cn";

export function InterviewInterfaceMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-lg shadow-black/5",
        className
      )}
    >
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-foreground">Mock Interview</p>
        <Badge tone="primary">Live</Badge>
      </div>

      <div className="relative mt-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sage-soft to-teal-soft">
        <svg viewBox="0 0 64 64" className="h-16 w-16 text-primary/70" aria-hidden="true">
          <circle cx="32" cy="24" r="12" fill="currentColor" opacity="0.9" />
          <path
            d="M10 58c2-13 12-20 22-20s20 7 22 20"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
        <span className="absolute end-3 top-3 flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-foreground">
          <Mic className="h-3 w-3 text-primary" aria-hidden="true" />
          <VoiceWaveform className="h-3" />
        </span>
      </div>

      <AdaptiveQuestionBubble
        className="mt-3"
        question="You mentioned your father funds your studies — what does he do for work?"
      />
    </div>
  );
}
