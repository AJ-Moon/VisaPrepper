const SESSIONS = [
  { label: "Practice 1", note: "Several answers lacked detail", tone: "bg-warning" },
  { label: "Practice 2", note: "Clearer, but pace was rushed", tone: "bg-teal" },
  { label: "Practice 3", note: "Consistent, well-paced answers", tone: "bg-primary" },
];

export function ProgressTimelineMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5">
      <p className="text-sm font-semibold text-foreground">Your progress</p>
      <div className="mt-4 space-y-4">
        {SESSIONS.map((session, index) => (
          <div key={session.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={`h-2.5 w-2.5 rounded-full ${session.tone}`} />
              {index < SESSIONS.length - 1 && <span className="mt-1 h-8 w-px bg-border" />}
            </div>
            <div className="-mt-0.5">
              <p className="text-xs font-semibold text-foreground">{session.label}</p>
              <p className="text-xs text-muted-foreground">{session.note}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Example progress view — your own sessions and notes will appear here.
      </p>
    </div>
  );
}
