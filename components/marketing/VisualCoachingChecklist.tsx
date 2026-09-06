import { AlertTriangle, CheckCircle2 } from "lucide-react";

const ITEMS = [
  { text: "Your face was clearly visible", ok: true },
  { text: "Framing and distance from camera looked good", ok: true },
  { text: "You looked away from the camera several times", ok: false },
  { text: "You were generally facing forward", ok: true },
];

export function VisualCoachingChecklist() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5">
      <p className="text-sm font-semibold text-foreground">Visual coaching notes</p>
      <ul className="mt-3 space-y-2.5">
        {ITEMS.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 text-sm text-foreground">
            {item.ok ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
            )}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
