import { ExamsResopnse } from "@/lib/types/exams";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const theToken = await getDecodeToken();

    const res = await fetch(`https://exam.elevateegy.com/api/v1/exams`, {
      method: "GET",
      headers: {
        token: theToken?.accessToken || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      let errorMessage;
      try {
        errorMessage = await res.json();
      } catch {
        errorMessage = { message: await res.text() };
      }
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const data: GetApiResponse<ExamsResopnse> = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in GET /api/exams:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
