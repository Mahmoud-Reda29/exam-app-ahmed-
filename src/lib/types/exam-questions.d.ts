import { ISODateString } from "next-auth";

// Resusable Answer Keys

export type AnswerKey = "A1" | "A2" | "A3" | "A4";

//Answer object type

export type Answers = {
  answer: string;
  key: AnswerKey;
};

// Exam object type

export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: ISODateString;
};

// Question object type

export type Question = {
  answers: Answers[];
  type: "single_choice" | string;
  _id: string;
  question: string;
  correct: AnswerKey; //must match one of the  keys
  subject: string | null;
  exam: Exam;
  createdAt: ISODateString;
};

// Final extracted wrapper type => array of Question
export type ExamsQuestionsResponse = {
  questions: Question[];
};

export type ExamsQuestionsQueryResponse = {
  data: {
    questions: Omit<Question, "correct">[];
  };
};
