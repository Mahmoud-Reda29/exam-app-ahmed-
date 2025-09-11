// hooks/useExamQuestions.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import type { ExamsQuestionsQueryResponse } from "@/lib/types/exam-questions";

export function useExamQuestions(examId: string) {
  if (!examId) throw new Error("The examId was not provided");

  const { error, isLoading, data } = useQuery<ExamsQuestionsQueryResponse>({
    queryKey: ["exam-questions", examId],
    queryFn: async () => {
      const res = await fetch(`/api/exam-question?exam=${examId}`);
      if (res.status === 404) throw notFound();
      if (!res.ok) throw new Error("Failed to fetch exam questions");
      return res.json();
    },
  });

  return { isLoading, data: data?.data, error };
}
