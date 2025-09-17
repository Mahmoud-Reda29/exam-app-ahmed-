import { SubjectResponse } from "@/lib/types/subjects";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "6";
  const page = searchParams.get("page") || "1";

  const theToken = await getDecodeToken();

  const res = await fetch(
    `${process.env.API}/subjects?limit=${limit}&page=${page}`,
    {
      headers: {
        token: `${theToken?.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data: ApiResponse<SubjectResponse> = await res.json();
  return NextResponse.json({ data }, { status: 200 });
}
