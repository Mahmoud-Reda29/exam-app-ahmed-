/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { ChangePasswordValues } from "@/lib/schemes/change-password.scheme";
import { AuthResponse } from "@/lib/types/auth";
import { getDecodeToken } from "@/lib/utils/get-decode-token";

export async function deleteAccount() {
  const theToken = await getDecodeToken();
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.DELETE_ACCOUNT_URL!}`,
    {
      method: "DELETE",
      headers: {
        token: theToken?.accessToken || "",
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
