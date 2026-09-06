import { ArrowDown, MessageCircle, Search, Sparkles, User } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircle,
    label: "Question",
    text: "Who is sponsoring your trip?",
    tone: "bg-surface-muted text-foreground",
  },
  {
    icon: User,
    label: "Your answer",
    text: "My uncle is sponsoring me.",
    tone: "bg-sage-soft text-foreground",
  },
  {
    icon: Search,
    label: "VisaPrepper notices",
    text: "Occupation and relationship to your uncle weren't covered.",
    tone: "bg-warning-soft text-foreground",
  },
  {
    icon: Sparkles,
    label: "Follow-up",
    text: "What does your uncle do, and how often do you stay in touch?",
    tone: "bg-teal-soft text-foreground",
  },
];

export function AdaptiveFollowUpFlow() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5">
      {STEPS.map((step, index) => (
        <div key={step.label}>
          <div className={`flex items-start gap-3 rounded-xl px-3.5 py-3 ${step.tone}`}>
            <step.icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">
                {step.label}
              </p>
              <p className="mt-0.5 text-sm">{step.text}</p>
            </div>
          </div>
          {index < STEPS.length - 1 && (
            <div className="flex justify-center py-1.5">
              <ArrowDown className="h-4 w-4 text-border" aria-hidden="true" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
