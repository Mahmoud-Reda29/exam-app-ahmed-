"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronDown, Timer } from "lucide-react";
import { useExames } from "@/app/(homePage)/[subject_id]/_hooks/use-exams.hook";
import type { Exams } from "@/lib/types/exams";
import { LoopLoader } from "../../_components/loop-loader";

export default function SubjectAllExams() {
  const params = useParams<{ subject_id: string }>();
  const subjectId = params.subject_id;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExames(subjectId);

  console.log(data);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="text-center py-8">
        <LoopLoader />
      </div>
    );
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">Failed to load exams</p>
    );

  // Flatten  all pages
  const allExams: Exams[] = data?.pages.flatMap((p) => p.data?.exams) || [];

  return (
    <div className="w-full px-6 font-mono">
      <ul className="flex flex-col gap-3">
        {allExams.map((exam) => (
          <li key={exam._id}>
            <Link
              href={`/${subjectId}/${exam._id}`}
              className="flex items-center justify-between bg-blue-50 px-4 py-3 border border-blue-100"
            >
              <div className="flex flex-col">
                <span className="text-blue-700 font-semibold">
                  {exam.title}
                </span>
                <span className="text-gray-500 text-sm">
                  {exam.numberOfQuestions} Questions
                </span>
              </div>

              <div className="flex items-center gap-2  text-sm">
                <Timer size={24} className="text-gray-400" />
                <span className="text-gray-800 font-medium">
                  Duration: {exam.duration}{" "}
                  <span className="font-normal"> minutes</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full h-16 p-2 mt-6 flex flex-col justify-center items-center gap-1 text-gray-600">
        {hasNextPage ? (
          <>
            <span className="text-base font-normal">Scroll to view more</span>
            <ChevronDown size={18} />
          </>
        ) : (
          <span className="text-base font-normal">End of list</span>
        )}
      </div>

      <div ref={loadMoreRef} className="text-center py-6 text-gray-500">
        {isFetchingNextPage && "Loading more..."}
      </div>
    </div>
  );
}
