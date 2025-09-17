import { useMutation } from "@tanstack/react-query";
import { SendForgetPasswordCreatePassword } from "../_actions/forget-password-create-password.action";
import { CreateNewPasswordRequest } from "@/lib/types/create-new-password";

export function useAddForgetPasswordCreatePassword() {
  const {
    mutate: ResetPassword,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: CreateNewPasswordRequest) =>
      SendForgetPasswordCreatePassword(data),
  });
  return { ResetPassword, error, isPending };
}
