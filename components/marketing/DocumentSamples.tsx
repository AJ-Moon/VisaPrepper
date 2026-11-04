"use client";
import { trapModalFocus } from "@/lib/utils/dialog";

import { useId, useRef, useState } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";
import BundleExplanation from "@/components/marketing/BundleExplanation";
import { Container } from "@/components/layout/Container";
import { PREPARATION_EXAMPLE_NOTE, REPORT_SAMPLES, type SampleFinding, type ReportSample } from "@/lib/content/report-samples";

function Finding({ finding, homepage = false, route }: { finding: SampleFinding; homepage?: boolean; route?: string }) {
  return <article data-document-finding={homepage ? "" : undefined} className={homepage ? "sample-report p-5 sm:p-7" : "rounded-xl border bg-surface p-5"}>
    {route && <p className="text-xs font-semibold uppercase tracking-wide text-teal">{route} · Document comparison</p>}
    <h3 className={homepage ? "mt-3 font-display text-2xl font-semibold" : "font-display text-xl font-semibold"}>{finding.title}</h3>
    <dl className="mt-5 grid gap-3 sm:grid-cols-2">{finding.values.map(item => <div key={item.label} className="rounded-xl border bg-surface p-4"><dt className="text-sm text-muted-foreground">{item.label}</dt><dd className="mt-1 font-semibold">{item.value}</dd></div>)}</dl>
    <p className="mt-4 text-sm leading-relaxed">{finding.explanation}</p>
    <p className="mt-3 text-sm leading-relaxed"><strong>Next step: </strong>{finding.nextStep}</p>
  </article>;
}

function ReportExcerpt({ sample }: { sample: ReportSample }) {
  return <div className="sample-report space-y-5 p-4 sm:p-7">
    <div className="rounded-xl border bg-surface p-5"><h3 className="text-lg font-semibold">{sample.route}</h3><p className="mt-2 text-sm leading-relaxed">{sample.summary}</p></div>
    {sample.findings.map(finding => <Finding key={finding.title} finding={finding}/>)}
    {sample.agreement && <section className="rounded-xl border bg-surface p-4 text-sm"><h3 className="font-semibold">What matches: net pay and bank credits</h3><p className="mt-3 leading-relaxed">{sample.agreement}</p></section>}
  </div>;
}

export default function DocumentSamples({ showcase = false }: { showcase?: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  function close() { dialog.current?.close(); }
  function tabs(location: string) {
    return <div role="tablist" aria-label="Sample document reports" className="grid grid-cols-3 gap-1 rounded-xl bg-surface-muted p-1">
      {REPORT_SAMPLES.map((sample, index) => <button key={sample.id} type="button" role="tab" id={`${id}-${location}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-${location}-panel`} tabIndex={selected === index ? 0 : -1} className={`min-h-12 rounded-lg px-2 py-2 text-sm font-semibold transition-colors sm:px-4 ${selected === index ? "bg-surface text-primary shadow-sm" : "text-muted-foreground hover:bg-white/60"}`} onClick={() => setSelected(index)} onKeyDown={event => {
        let next = selected;
        if (event.key === "ArrowRight") next = (selected + 1) % REPORT_SAMPLES.length;
        else if (event.key === "ArrowLeft") next = (selected + REPORT_SAMPLES.length - 1) % REPORT_SAMPLES.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = REPORT_SAMPLES.length - 1;
        else return;
        event.preventDefault(); setSelected(next);
        document.getElementById(`${id}-${location}-tab-${next}`)?.focus();
      }}>{sample.tab}</button>)}
    </div>;
  }
  return <section id="sample-report" className={`scroll-mt-24 border-y ${showcase ? "bg-sage-soft" : "bg-sage-soft/35"}`} aria-labelledby={`${id}-heading`}>
    <Container className={showcase ? "py-14 sm:py-20" : "py-12 sm:py-16"}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div className="max-w-2xl"><p className="flex items-center gap-2 text-sm font-semibold text-primary"><FileText size={17} aria-hidden="true"/>See the document review</p><h2 id={`${id}-heading`} className="mt-3 font-display text-3xl font-semibold sm:text-4xl">See what a document check can find</h2><p className="mt-4 leading-relaxed text-muted-foreground">Compare the details in your forms and documents, then see what needs attention.</p><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal">Illustrative sample</p></div><button ref={opener} type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" onClick={() => dialog.current?.showModal()}>Explore sample document report <ArrowUpRight size={16} aria-hidden="true"/></button></div>
      <BundleExplanation />
      {tabs("inline")}
      <div role="tabpanel" id={`${id}-inline-panel`} aria-labelledby={`${id}-inline-tab-${selected}`} tabIndex={0} className={`mt-4 overflow-hidden rounded-2xl border ${showcase ? "border-primary/15 shadow-lg shadow-primary/10" : ""}`}><Finding homepage finding={REPORT_SAMPLES[selected].findings[0]} route={REPORT_SAMPLES[selected].route}/></div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{PREPARATION_EXAMPLE_NOTE}</p>
    </Container>
    <dialog onKeyDown={trapModalFocus} ref={dialog} aria-labelledby={`${id}-dialog-title`} className="sample-dialog rounded-2xl border bg-background text-foreground shadow-2xl" onClose={() => opener.current?.focus()} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background p-4 sm:px-6"><div><h2 id={`${id}-dialog-title`} className="font-display text-xl font-semibold">Explore sample document report</h2><p className="mt-1 text-xs text-muted-foreground">Illustrative sample</p></div><button autoFocus type="button" onClick={close} className="rounded-full p-3 hover:bg-sage-soft" aria-label="Close sample document report"><X size={20} aria-hidden="true"/></button></div>
      <div className="p-3 sm:p-6">{tabs("expanded")}<div role="tabpanel" id={`${id}-expanded-panel`} aria-labelledby={`${id}-expanded-tab-${selected}`} tabIndex={0} className="mt-4 overflow-hidden rounded-xl border"><ReportExcerpt key={selected} sample={REPORT_SAMPLES[selected]}/></div><p className="mt-4 text-xs leading-relaxed text-muted-foreground">{PREPARATION_EXAMPLE_NOTE}</p></div>
    </dialog>
  </section>;
}
