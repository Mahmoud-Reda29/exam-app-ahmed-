import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileAccountSkeleton = () => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto h-full bg-white p-6 rounded-lg shadow">
        <div className="grid gap-6">
          {/* First + Last Name */}
          <div className="flex justify-center items-center gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-300" /> {/* label */}
              <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
              {/* input */}
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-300" /> {/* label */}
              <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
              {/* input */}
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
            <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
