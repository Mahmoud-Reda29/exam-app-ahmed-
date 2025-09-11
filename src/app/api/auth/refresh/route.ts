import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // adjust path

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const body = await req.json().catch(() => ({}));

  // force session update with new data from client
  const session = await getServerSession(authOptions);

  return Response.json(session);
}
