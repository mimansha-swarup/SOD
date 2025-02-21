export const enum QuestionnaireIds {
  START = "Start",
  MANIFESTATION = "Manifestation",
  LEVEL = "Level",
  INCOME = "Income",
  GOAL = "Finish",
}
export const questionnaireList = [
  {
    id: QuestionnaireIds.START,
    title: "Welcome to Metric Tracker",
    description: "One Goal, 100 Days, Endless Possibilities!",
  },
  {
    id: QuestionnaireIds.MANIFESTATION,
    title: "What you want to manifest",
    description:
      "We would love to know what you want to manifest over these 100 days",
    inputType: "Input",
    input: {
      type: "text",
      placeholder: "I want to earn million dollars",
    },
  },
  {
    id: QuestionnaireIds.LEVEL,
    title: "Where do you stand?",
    description: "",
    inputType: "Radio",
    options: [],
  },
  {
    id: QuestionnaireIds.INCOME,
    title: "You wanna reveal your income?",
    description: "Don't worry Nobody else is gonna know about it",
    inputType: "Input",
    input: {
      type: "number",
      placeholder: "500000",
    },
  },
  {
    id: QuestionnaireIds.GOAL,
    title: "After these 100 days how much you wanna earn?",
    description:
      "you will get good visualization of how far you are from achieving this",
    inputType: "Input",
    input: {
      type: "number",
      placeholder: "1200000",
    },
  },
];
