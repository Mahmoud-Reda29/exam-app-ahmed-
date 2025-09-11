"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter } from "@/components/ui/card";
import { useSubjects } from "@/app/(homePage)/_hooks/use-subjects.hook";
import { Subject } from "@/lib/types/subjects";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { LoopLoader } from "./loop-loader"; // ✅ import loader

export default function Dashboard() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending, // ✅ add this if exposed by your hook
  } = useSubjects(6);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ✅ Show loader while fetching first page or pending
  if (isLoading || isPending) {
    return <LoopLoader />;
  }

  if (isError) {
    return (
      <p className="text-center py-8 text-red-500">Failed to load subjects</p>
    );
  }

  const allSubjects = data?.pages.flatMap((page) => page.data.subjects) || [];

  return (
    <div className="flex flex-col font-mono w-full px-6">
      <div className="grid w-full grid-cols-3 gap-2">
        {allSubjects.map((subject: Subject) => (
          <Link key={subject._id} href={`/${subject._id}`} className="block">
            <Card className="relative w-full h-input overflow-hidden border-none">
              <Image
                src={subject.icon}
                alt={subject.name}
                fill
                className="object-cover"
                priority={false}
              />
              <div className="absolute bottom-2 w-full bg-blue-blue-card">
                <CardFooter className="justify-center text-white text-xl font-semibold py-4">
                  {subject.name}
                </CardFooter>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="w-full h-16 p-2 mt-6 flex flex-col justify-center items-center gap-1 text-gray-600">
        {hasNextPage ? (
          <>
            <span className="text-base font-normal">Scroll to view more</span>
            <ChevronDown size={18} />
          </>
        ) : (
          <span className="text-base font-normal">No more subjects</span>
        )}
      </div>

      <div ref={loadMoreRef} className="text-center py-6 text-gray-500">
        {isFetchingNextPage && <LoopLoader />}
      </div>
    </div>
  );
}
