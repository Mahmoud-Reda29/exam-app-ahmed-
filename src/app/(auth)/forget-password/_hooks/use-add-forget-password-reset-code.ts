import { useMutation } from "@tanstack/react-query";
import { ResetCodeValues } from "@/lib/schemes/forget-password.scheme";
import { SendForgetPasswordResetCode } from "../_actions/forget-password-reset-code.action";

export function useAddForgetPasswordResetCode() {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (data: ResetCodeValues) => SendForgetPasswordResetCode(data),
  });
  return { mutateAsync, error, isPending };
}
