"use server";
import { AuthResponse } from "@/lib/types/auth";
import { RegisterValues } from "@/lib/schemes/register.scheme";

export async function registerUser(data: RegisterValues) {
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.REGISTER_URL!}`,
    {
      method: "POST",
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
