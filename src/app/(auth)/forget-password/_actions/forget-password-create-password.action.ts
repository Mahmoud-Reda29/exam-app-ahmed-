"use server";
import { AuthResponse } from "@/lib/types/auth";
import { CreateNewPasswordRequest } from "@/lib/types/create-new-password";

export async function SendForgetPasswordCreatePassword(
  data: CreateNewPasswordRequest
) {
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.CREATE_NEW_PASSWORD_URL!}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response: ApiResponse<AuthResponse> = await res.json();

  if ("code" in response) {
    throw new Error(response.message || "Something went wrong");
  }

  // Remove token from response if present
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token, ...rest } = response;
  return rest;
}
