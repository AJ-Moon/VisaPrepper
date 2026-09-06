import { FileText, MessageSquareText } from "lucide-react";

export function ConsistencyCheckVisual() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface-muted p-3">
          <FileText className="mx-auto h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">Application</p>
          <p className="mt-1 text-[11px] text-foreground">“6-month lease, own apartment”</p>
        </div>
        <div className="rounded-xl bg-surface-muted p-3">
          <MessageSquareText className="mx-auto h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-semibold text-muted-foreground">Earlier answer</p>
          <p className="mt-1 text-[11px] text-foreground">“I live with my parents”</p>
        </div>
        <div className="rounded-xl bg-warning-soft p-3">
          <MessageSquareText className="mx-auto h-4 w-4 text-warning" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-semibold text-warning">Later answer</p>
          <p className="mt-1 text-[11px] text-foreground">“I just moved out on my own”</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-teal-soft px-3.5 py-3 text-xs text-foreground">
        <span className="font-semibold text-teal">Worth clarifying: </span>
        Your living situation was described two different ways — make sure your
        answer matches what&rsquo;s in your application.
      </div>
    </div>
  );
}
