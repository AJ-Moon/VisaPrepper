// Owner-written fictional marketing examples; no customer data or measured results.
export type InterviewExample = {
  topic: string;
  question: string;
  answer: string;
  title: string;
  feedback: string;
  nextStep: string;
};

export const INTERVIEW_SAMPLE = {
  label: "Illustrative sample",
  description: "Fictional answers and feedback for demonstration.",
  examples: [
    {
      topic: "Funding",
      question: "How will you cover your tuition and living expenses?",
      answer: "My father is sponsoring me. He runs an established business, and he can afford my tuition and living expenses. We also have savings set aside for my studies.",
      title: "You’ve explained who will pay—but not how the costs are covered.",
      feedback: "Your answer identifies your sponsor and mentions savings, but doesn’t explain the amount available or how it compares with your study costs.",
      nextStep: "Be ready to explain your actual tuition and living costs, the funds available, and where those funds come from.",
    },
    {
      topic: "University choice",
      question: "Why did you choose this university?",
      answer: "It has a strong reputation for computer science, the course matches my interests, and I think the international exposure will help my career.",
      title: "Your reasons could describe many universities.",
      feedback: "The answer explains your general interest, but doesn’t identify what makes this particular course suitable for your plans.",
      nextStep: "Choose specific features you genuinely researched—such as relevant modules, a project or the course structure—and explain how they connect to your background and goals.",
    },
    {
      topic: "Plans after graduation",
      question: "What will you do after graduation?",
      answer: "I plan to return to Pakistan and work in the technology industry. There are good opportunities here, and my family is also based here.",
      title: "Your direction is clear. Make the career connection more specific.",
      feedback: "You’ve stated your plan, but haven’t explained which type of work you intend to pursue or how this degree supports it.",
      nextStep: "Explain your genuine intended role or field and how the skills from the course fit that plan. Don’t invent job offers or commitments.",
    },
  ] satisfies InterviewExample[],
} as const;

export const INTERVIEW_REPORT_TABS = ["Summary", "Priorities", "Answer Review", "Transcript"] as const;
