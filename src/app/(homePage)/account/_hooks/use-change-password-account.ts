import { useMutation } from "@tanstack/react-query";
import { ChangePasswordValues } from "@/lib/schemes/change-password.scheme";
import { changePassword } from "../_actions/account-change-password.action";

export function useChangePassword() {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (data: ChangePasswordValues) => changePassword(data),
  });
  return { mutateAsync, error, isPending };
}
