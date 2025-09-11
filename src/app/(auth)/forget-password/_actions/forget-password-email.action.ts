"use server";
import { EmailForgetPasswordValue } from "@/lib/schemes/forget-password.scheme";
import { EmailForgetPasswordResponse } from "../_types/forget-password-email";

export async function SendForgetPasswordEmail(data: EmailForgetPasswordValue) {
  const res = await fetch(
    `${process.env.BASE_URL!}${process.env.FORGET_PASSWORD_URL!}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response: ApiResponse<EmailForgetPasswordResponse> = await res.json();

  if ("code" in response) {
    throw new Error(response.message || "Something went wrong");
  }
  return response;
}
