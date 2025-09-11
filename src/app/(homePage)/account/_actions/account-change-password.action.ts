/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { ChangePasswordValues } from "@/lib/schemes/change-password.scheme";
import { AuthResponse } from "@/lib/types/auth";
import { getDecodeToken } from "@/lib/utils/get-decode-token";

export async function changePassword(data: ChangePasswordValues) {
  const theToken = await getDecodeToken();
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.CHANGE_PASSWORD_URL!}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
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
  const { token, ...rest } = response;

  return rest;
}
