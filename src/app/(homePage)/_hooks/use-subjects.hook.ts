"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { SubjectResponse } from "@/lib/types/subjects";

export function useSubjects(limit: number = 6) {
  return useInfiniteQuery<SubjectResponse>({
    queryKey: ["subjects", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/subjects?limit=${limit}&page=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch subjects");
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data?.metadata;
      if (!meta) return undefined;
      return meta.currentPage < meta.numberOfPages
        ? meta.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}
