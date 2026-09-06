import { GraduationCap, Landmark, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const FIELDS = [
  { icon: GraduationCap, label: "Program", value: "MS Computer Science — Northgate University" },
  { icon: Landmark, label: "Funding", value: "Father — self-employed, business income" },
  { icon: MapPin, label: "Travel history", value: "None yet" },
  { icon: Users, label: "Family in the U.S.", value: "One cousin, Chicago (visiting relative)" },
];

export function ApplicationCardMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Your Application</p>
        <Badge tone="teal">F1 · Student</Badge>
      </div>
      <div className="mt-4 space-y-3.5">
        {FIELDS.map((field) => (
          <div key={field.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-soft">
              <field.icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {field.label}
              </p>
              <p className="truncate text-sm text-foreground">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
