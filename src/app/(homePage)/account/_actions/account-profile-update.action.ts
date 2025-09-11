"use server";
import { AuthResponse } from "@/lib/types/auth";
import { getDecodeToken } from "@/lib/utils/get-decode-token";

export async function updateUser(data: UpdateProfileType) {
  const token = await getDecodeToken();
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.UPDATE_URL!}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        token: token?.accessToken || "",
        "Content-Type": "application/json",
      },
    }
  );
  const response: ApiResponse<AuthResponse> = await res.json();

  if ("code" in response) {
    throw new Error(response.message || "Something went wrong");
  }

  return response;
}
