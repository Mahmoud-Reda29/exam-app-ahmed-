import { ExamsQuestionsResponse } from "@/lib/types/exam-questions";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const theToken = await getDecodeToken();

    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("exam");

    const res = await fetch(`${process.env.API}/questions?exam=${examId}`, {
      headers: {
        token: theToken?.accessToken || "",
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
