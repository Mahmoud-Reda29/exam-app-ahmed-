import { useMutation } from "@tanstack/react-query";
import { SendForgetPasswordEmail } from "../_actions/forget-password-email.action";
import { EmailForgetPasswordValue } from "@/lib/schemes/forget-password.scheme";

export function useAddForgetPasswordEmail() {
  const {
    mutate: ForgetPassword,
    error,
    isPending,
    data: forgetEmailData,
  } = useMutation({
    mutationFn: (data: EmailForgetPasswordValue) =>
      SendForgetPasswordEmail(data),
  });
  return { ForgetPassword, error, isPending, forgetEmailData };
}
