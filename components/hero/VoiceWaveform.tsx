import { cn } from "@/lib/utils/cn";

const BAR_DELAYS = [0, 0.12, 0.24, 0.36, 0.48, 0.36, 0.24, 0.12, 0];

export function VoiceWaveform({ className, active = true }: { className?: string; active?: boolean }) {
  return (
    <div className={cn("flex h-6 items-end gap-[3px]", className)} aria-hidden="true">
      {BAR_DELAYS.map((delay, index) => (
        <span
          key={index}
          className={cn(
            "w-[3px] origin-bottom rounded-full bg-teal",
            active ? "h-full animate-waveform" : "h-1.5"
          )}
          style={active ? { animationDelay: `${delay}s` } : undefined}
        />
      ))}
    </div>
  );
}
