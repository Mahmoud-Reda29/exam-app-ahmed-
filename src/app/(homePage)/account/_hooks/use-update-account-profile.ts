import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../_actions/account-profile-update.action";

export function useUpdateAccountProfile() {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (data: UpdateProfileType) => updateUser(data),
  });
  return { mutateAsync, error, isPending };
}
