import { AudioLines, Clock3, Hourglass, MicVocal, Repeat, Timer, Volume2, Waves } from "lucide-react";

const METRICS = [
  { icon: Timer, label: "Speaking pace", value: "Slightly fast" },
  { icon: MicVocal, label: "Filler words", value: "6 in this answer" },
  { icon: Hourglass, label: "Long pauses", value: "2 pauses over 3s" },
  { icon: Clock3, label: "Answer duration", value: "48 seconds" },
  { icon: AudioLines, label: "Response timing", value: "Answered promptly" },
  { icon: Repeat, label: "Repeated words", value: "\"basically\" x4" },
  { icon: Waves, label: "Hesitation markers", value: "Low" },
  { icon: Volume2, label: "Background audio", value: "Clear" },
];

export function CommunicationMetricsGrid() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      {METRICS.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-border bg-surface p-3.5 shadow-sm shadow-black/5"
        >
          <metric.icon className="h-4 w-4 text-teal" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {metric.label}
          </p>
          <p className="mt-0.5 text-sm font-medium text-foreground">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
