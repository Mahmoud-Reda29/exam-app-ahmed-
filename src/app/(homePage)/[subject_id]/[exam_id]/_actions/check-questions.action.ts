"use server";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { CheckRequest, ExamResultResponse } from "@/lib/types/check-questions";

export async function checkQuestions(data: CheckRequest) {
  const theToken = await getDecodeToken();
  const res = await fetch(
    // `${process.env.BASE_URL!}${process.env.CHECK_QUESTIONS!}`,
    `https://exam.elevateegy.com/api/v1/questions/check`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        token: theToken?.accessToken || "",
      },
    }
  );
  const response: ApiResponse<ExamResultResponse> = await res.json();

  if ("code" in response) {
    throw new Error(response.message || "Something went wrong");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return response;
}
