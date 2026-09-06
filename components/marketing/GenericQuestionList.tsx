import { HelpCircle } from "lucide-react";

const QUESTIONS = [
  "Why do you want to study in the United States?",
  "How will you finance your education?",
  "Do you intend to return to your home country?",
  "What does your sponsor do for work?",
];

export function GenericQuestionList() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-dashed border-border bg-surface-muted p-5">
      <p className="text-sm font-semibold text-muted-foreground">
        A generic question list
      </p>
      <ul className="mt-3 space-y-2.5">
        {QUESTIONS.map((question) => (
          <li
            key={question}
            className="flex items-start gap-2.5 rounded-xl bg-surface px-3.5 py-3 text-sm text-muted-foreground"
          >
            <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-border" aria-hidden="true" />
            {question}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Same questions for every applicant, regardless of their case.
      </p>
    </div>
  );
}
