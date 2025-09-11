import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../_actions/account-delete.action";

export function useDeleteAccount() {
  const { mutateAsync, error, isPending, isSuccess } = useMutation({
    mutationFn: () => deleteAccount(),
  });
  return { mutateAsync, error, isPending, isSuccess };
}
