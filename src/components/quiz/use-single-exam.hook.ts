"use client";

import { SingleExam } from "@/lib/types/single-exam";
import { useQuery } from "@tanstack/react-query";

export function useSingleExames(exmaId: string) {
  if (!exmaId) {
    throw new Error("The ExamId not Found");
  }

  return useQuery<GetApiResponse<SingleExam>>({
    queryKey: ["exams", exmaId],
    queryFn: async () => {
      const res = await fetch(`/api/exams/${exmaId}`, {});
      if (!res.ok) throw new Error("Failed to fetch exams");
      return res.json();
    },
  });
}
