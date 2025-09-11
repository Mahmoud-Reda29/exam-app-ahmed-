import { z } from "zod";

// allowed answer keys
export const AnswerKeySchema = z.enum(["A1", "A2", "A3", "A4", "empty"]);
export type AnswerKey = z.infer<typeof AnswerKeySchema>;

// one answer item (allow empty string while editing)
const AnswerItemSchema = z.object({
  questionId: z.string(),
  // correct may be empty string during editing; final submit disallows ""
  correct: z.union([AnswerKeySchema, z.literal("")]),
});

// main form schema: answers array + optional time
export const QuizFormSchema = z.object({
  answers: z.array(AnswerItemSchema),
  time: z.number().optional(),
});

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
