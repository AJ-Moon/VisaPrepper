"use client";

import { useId, useRef, useState } from "react";
import { ArrowUpRight, MessageSquare, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { INTERVIEW_SAMPLE as sample, INTERVIEW_REPORT_TABS, type InterviewExample } from "@/lib/content/interview-sample";
import { PREPARATION_EXAMPLE_NOTE } from "@/lib/content/report-samples";
import { trapModalFocus } from "@/lib/utils/dialog";

function AnswerPreview({ example }: { example: InterviewExample }) {
  return (
    <article data-interview-answer-review className="grid gap-5 rounded-2xl border bg-surface p-5 sm:p-7 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal">Question</p>
        <p className="mt-3 text-sm leading-relaxed">{example.question}</p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-teal">Applicant’s answer</p>
        <blockquote className="mt-2 border-l-2 border-teal pl-4 text-base leading-relaxed">“{example.answer}”</blockquote>
      </div>
      <div className="rounded-xl bg-sage-soft/60 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Answer review</p>
        <h3 className="mt-3 text-xl font-semibold">{example.title}</h3>
        <p className="mt-3 text-sm leading-relaxed">{example.feedback}</p>
        <p className="mt-4 text-sm leading-relaxed"><strong>Next practice step: </strong>{example.nextStep}</p>
      </div>
    </article>
  );
}

function ReportPanel({ selected }: { selected: number }) {
  if (selected === 0) return (
    <section className="rounded-xl border bg-surface p-5">
      <h3 className="text-lg font-semibold">Reasonable answers can still leave a follow-up</h3>
      <p className="mt-3 text-sm leading-relaxed">These examples explain a sponsor, a university choice and a career direction. The next step is to connect each answer to specific details you can explain truthfully.</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">{sample.examples.map(example => <li key={example.topic}>{example.title}</li>)}</ul>
    </section>
  );
  if (selected === 1) return (
    <div className="space-y-4">{sample.examples.map(example => (
      <section key={example.topic} className="rounded-xl border bg-warning-soft/40 p-5">
        <h3 className="font-semibold">{example.topic}</h3>
        <p className="mt-3 text-sm leading-relaxed">{example.nextStep}</p>
      </section>
    ))}</div>
  );
  if (selected === 2) return (
    <div className="space-y-5">{sample.examples.map(example => <AnswerPreview key={example.topic} example={example}/>)}</div>
  );
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fictional practice conversation</h3>
      {sample.examples.map(example => (
        <article key={example.topic} className="rounded-xl border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Question</p>
          <p className="mt-2 text-sm leading-relaxed">{example.question}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal">Applicant’s answer</p>
          <blockquote className="mt-2 border-l-2 border-teal pl-3 text-sm leading-relaxed">“{example.answer}”</blockquote>
        </article>
      ))}
    </div>
  );
}

export default function InterviewSamples() {
  const [selected, setSelected] = useState(2);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  return (
    <section id="interview-example" className="home-forest scroll-mt-24 text-primary-foreground" aria-labelledby={`${id}-heading`}>
      <Container className="py-14 sm:py-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-semibold text-sage-soft"><MessageSquare size={17} aria-hidden="true"/>Interview feedback</p>
            <h2 id={`${id}-heading`} className="mt-3 font-display text-3xl font-semibold sm:text-4xl">See the feedback after your practice interview</h2>
            <p className="mt-4 leading-relaxed text-sage-soft">An answer can sound reasonable while leaving a detail that a follow-up question could expose.</p>
          </div>
          <button ref={opener} type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => { setSelected(2); dialog.current?.showModal(); }}>Explore sample interview report <ArrowUpRight size={16} aria-hidden="true"/></button>
        </div>
        <p className="mb-4 text-xs font-semibold text-sage-soft">{sample.label} · {sample.description}</p>
        <div className="rounded-2xl text-foreground shadow-xl shadow-black/20"><AnswerPreview example={sample.examples[0]}/></div>
      </Container>
      <dialog ref={dialog} onKeyDown={trapModalFocus} aria-labelledby={`${id}-dialog-title`} className="sample-dialog rounded-2xl border bg-background text-foreground shadow-2xl" onClose={() => opener.current?.focus()}>
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background p-4 sm:px-6">
          <div><h2 id={`${id}-dialog-title`} className="font-display text-xl font-semibold">Explore sample interview report</h2><p className="mt-1 text-xs text-muted-foreground">{sample.label} · {sample.description}</p></div>
          <button autoFocus type="button" onClick={() => dialog.current?.close()} className="rounded-full p-3 hover:bg-sage-soft" aria-label="Close sample interview report"><X size={20} aria-hidden="true"/></button>
        </div>
        <div className="p-4 sm:p-6">
          <div role="tablist" aria-label="Interview report sections" className="flex gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1">
            {INTERVIEW_REPORT_TABS.map((label, index) => (
              <button key={label} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} className={`min-h-11 shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${selected === index ? "bg-surface text-primary shadow-sm" : "text-muted-foreground"}`} onClick={() => setSelected(index)} onKeyDown={event => {
                let next = selected;
                if (event.key === "ArrowRight") next = (selected + 1) % INTERVIEW_REPORT_TABS.length;
                else if (event.key === "ArrowLeft") next = (selected + INTERVIEW_REPORT_TABS.length - 1) % INTERVIEW_REPORT_TABS.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = INTERVIEW_REPORT_TABS.length - 1;
                else return;
                event.preventDefault();
                setSelected(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }}>{label}</button>
            ))}
          </div>
          <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className="mt-5"><ReportPanel selected={selected}/></div>
          <p className="mt-4 text-xs text-muted-foreground">{PREPARATION_EXAMPLE_NOTE}</p>
        </div>
      </dialog>
    </section>
  );
}
