"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { ExamsResopnse } from "@/lib/types/exams";

export function useExames(subjectId: string, limit: number = 4) {
  if (subjectId) {
    return useInfiniteQuery<ExamsResopnse>({
      queryKey: ["exams", subjectId, limit],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `/api/exams?subject=${subjectId}&limit=${limit}&page=${pageParam}`
        );

        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      },
      getNextPageParam: (lastPage) => {
        const meta = lastPage?.metadata;
        return meta.currentPage < meta.numberOfPages
          ? meta.currentPage + 1
          : undefined;
      },
      initialPageParam: 1,
    });
  }
  throw Error("The subId not Found");
}
