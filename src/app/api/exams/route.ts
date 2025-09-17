import { ExamsResopnse } from "@/lib/types/exams";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const theToken = await getDecodeToken();

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subject");
    const limit = searchParams.get("limit") || "4";
    const pageParam = searchParams.get("page") || "1";

    if (!subjectId) {
      return NextResponse.json({ error: "Missing subjectId" }, { status: 400 });
    }

    const res = await fetch(
      `${process.env.API}/exams?subject=${subjectId}&limit=${limit}&page=${pageParam}`,
      {
        headers: {
          token: theToken?.accessToken || "",
        },
        cache: "no-store",
      }
    );

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
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in GET /api/exams:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
