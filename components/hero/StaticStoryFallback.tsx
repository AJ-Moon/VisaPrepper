import { ChevronDown } from "lucide-react";
import { ApplicationCardMock } from "@/components/hero/ApplicationCardMock";
import { InterviewInterfaceMock } from "@/components/hero/InterviewInterfaceMock";
import { AnalysisFlowMock } from "@/components/hero/AnalysisFlowMock";
import { InterviewReportMock } from "@/components/hero/InterviewReportMock";

const STAGES = [
  { label: "Your application", Component: ApplicationCardMock },
  { label: "Adaptive interview", Component: InterviewInterfaceMock },
  { label: "Your answers, analyzed", Component: AnalysisFlowMock },
  { label: "Specific areas to improve", Component: InterviewReportMock },
];

export function StaticStoryFallback() {
  return (
    <div className="flex flex-col items-center gap-3">
      {STAGES.map((stage, index) => (
        <div key={stage.label} className="flex w-full flex-col items-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {stage.label}
          </p>
          <stage.Component />
          {index < STAGES.length - 1 && (
            <ChevronDown className="my-3 h-5 w-5 text-sage" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
