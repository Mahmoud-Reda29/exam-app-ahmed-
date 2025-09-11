export type SingleExam = {
  exam: {
    _id: string;
    title: string;
    duration: number; // in minutes
    subject: string; // subject_id reference
    numberOfQuestions: number;
    active: boolean;
    createdAt: string; // ISO date string
  };
};
