"use server";
import { ResetCodeValues } from "@/lib/schemes/forget-password.scheme";

export async function SendForgetPasswordResetCode(data: ResetCodeValues) {
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.RESET_PASSWORD_URL!}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response: ApiResetCodeResponse = await res.json();

  if ("code" in response) {
    throw new Error(response.message || "Something went wrong");
  }
  return response;
}
