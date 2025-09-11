// types.ts

import { QuizFormValues } from "../schemes/exam-question.scheme";

export type QuestionResult = {
  QID: string;
  Question: string;
  inCorrectAnswer?: string | null; // optional / may be "empty"
  correctAnswer: string;
  answers: Record<string, unknown>; // use a more specific shape if you know it
};

export type ExamResultResponse = {
  correct: number;
  wrong: number;
  total: string; // e.g. "50%"
  WrongQuestions: QuestionResult[];
  correctQuestions: QuestionResult[];
};
export type CheckRequest = {
  answers: QuizFormValues["answers"];
};
