// Simplified public demonstrations. Historical provenance remains in local handoff docs.
export type SampleFinding = {
  title: string;
  values: { label: string; value: string }[];
  explanation: string;
  nextStep: string;
};
export type ReportSample = {
  id: string;
  tab: string;
  route: string;
  summary: string;
  findings: SampleFinding[];
  agreement?: string;
};

export const PREPARATION_EXAMPLE_NOTE = "These are preparation examples, not visa decisions.";
export const REPORT_SAMPLES: ReportSample[] = [
  {
    id: "us",
    tab: "US application",
    route: "United States · DS-160",
    summary: "Check that the funding and education details tell a consistent story.",
    findings: [
      {
        title: "Your funding details differ",
        values: [{ label: "DS-160", value: "Self" }, { label: "Application answer", value: "Family support" }],
        explanation: "These answers describe different funding arrangements. Either may need correction.",
        nextStep: "Confirm who will actually pay and correct whichever information needs correction.",
      },
      {
        title: "Your education answers do not line up",
        values: [{ label: "Current study", value: "Student / studying A-levels" }, { label: "Secondary-level education or above", value: "No" }],
        explanation: "The education-history answer does not line up with the stated student status.",
        nextStep: "Review both answers and make sure they accurately describe your education.",
      },
    ],
  },
  {
    id: "uk",
    tab: "UK documents",
    route: "United Kingdom · Partner example",
    summary: "Clarify the salary difference and check whether a TB certificate is needed.",
    findings: [
      {
        title: "Your salary figures need clarification",
        values: [{ label: "Employer letter", value: "£36,000 annual gross base salary" }, { label: "Payslips", value: "£2,500 monthly gross base pay" }],
        explanation: "If £2,500 repeats for 12 months, it equals £30,000: a £6,000 annual difference to clarify. This compares gross base pay with gross base pay. Neither figure is automatically correct.",
        nextStep: "Ask the employer to clarify the recurring gross base pay and any change or period difference.",
      },
      {
        title: "Check whether a TB certificate is needed",
        values: [{ label: "Planned stay", value: "Six months or more" }, { label: "Certificate requirement", value: "Not yet confirmed" }],
        explanation: "The planned stay alone does not establish whether a certificate is needed. Relevant residence history and any exception still need checking.",
        nextStep: "Check the official requirements against your circumstances before deciding whether you need a certificate.",
      },
    ],
    agreement: "The monthly net pay and bank credits both show £2,018.45. Those amounts match, but net payments do not explain the difference between the gross salary figures above.",
  },
  {
    id: "schengen",
    tab: "Schengen documents",
    route: "Germany · Short-stay example",
    summary: "Check that your insurance and accommodation arrangements cover the trip dates.",
    findings: [
      {
        title: "Your insurance ends before your trip does.",
        values: [{ label: "Insurance ends", value: "15 December 2026" }, { label: "Trip ends", value: "16 December 2026" }],
        explanation: "The policy shown does not cover the final day of your trip.",
        nextStep: "Check whether you have other coverage or need to extend the policy.",
      },
      {
        title: "One night is not covered by these bookings",
        values: [{ label: "First booking", value: "11–13 December 2026" }, { label: "Next booking", value: "14–16 December 2026" }],
        explanation: "These bookings leave the night of 13–14 December unaccounted for. A checkout date does not include that night.",
        nextStep: "Confirm where you will stay that night and check any other booking, arrangement or itinerary change.",
      },
    ],
  },
];
