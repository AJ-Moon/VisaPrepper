export function FeedbackExampleCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Your answer
      </p>
      <div className="mt-2 rounded-xl bg-surface-muted px-3.5 py-3 text-sm italic text-foreground">
        “My father will fund my education.”
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-teal">
        What to improve
      </p>
      <div className="mt-2 rounded-xl bg-teal-soft px-3.5 py-3 text-sm text-foreground">
        You identified your sponsor but didn&rsquo;t explain his occupation,
        financial capacity, or how tuition and living expenses will be
        covered.
      </div>
    </div>
  );
}
