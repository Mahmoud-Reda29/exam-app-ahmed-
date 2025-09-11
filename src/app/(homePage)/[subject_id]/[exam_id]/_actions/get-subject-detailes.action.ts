"use server";

import { SingleSubjectResponse } from "@/lib/types/single-subject-type";
import { getDecodeToken } from "@/lib/utils/get-decode-token";

export async function singleSubjectDetailes({
  subject_id,
}: {
  subject_id: string;
}) {
  try {
    const theToken = await getDecodeToken();
    const res = await fetch(
      `https://exam.elevateegy.com/api/v1/subjects/${subject_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: theToken?.accessToken || "",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch subject (${res.status})`);
    }

    const response: ApiResponse<SingleSubjectResponse> = await res.json();

    if ("code" in response) {
      throw new Error(response.message || "Something went wrong");
    }

    return response;
  } catch (error) {
    console.error(" Error in SubjectId:", error);
    throw error;
  }
}
