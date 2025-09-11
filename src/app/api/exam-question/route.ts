import { ExamsQuestionsResponse } from "@/lib/types/exam-questions";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const theToken = await getDecodeToken();

    const res = await fetch(`https://exam.elevateegy.com/api/v1/questions`, {
      method: "GET",
      headers: {
        token: theToken?.accessToken || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data: ApiResponse<ExamsQuestionsResponse> = await res.json();

    if ("code" in data) {
      throw new Error(data.message || "Theres Something Wrong Please Try Agin");
    }

    //  delete correct
    const cleanedData = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: data.questions.map(({ correct, ...rest }) => rest),
    };

    return NextResponse.json({ data: cleanedData }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in GET /api/questions:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
