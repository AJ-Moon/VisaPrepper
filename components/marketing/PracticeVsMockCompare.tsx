import { GraduationCap, Video } from "lucide-react";

export function PracticeVsMockCompare() {
  return (
    <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm shadow-black/5">
        <GraduationCap className="h-5 w-5 text-teal" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-foreground">Practice Mode</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Focus on one weak area at a time, in a coaching-style environment
          with room to pause and reflect.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm shadow-black/5">
        <Video className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-foreground">Realistic Interview</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Answer start to finish without interruptions, then get your full
          report afterward — closer to interview day.
        </p>
      </div>
    </div>
  );
}
