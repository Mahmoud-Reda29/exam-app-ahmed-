import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../_actions/register.action";
import { RegisterValues } from "@/lib/schemes/register.scheme";

export function useRegisterUser() {
  // Setup the mutation for registering a user
  const {
    mutateAsync,
    error,
    isPending,
    data: registerData,
    isSuccess,
  } = useMutation({
    mutationFn: (data: RegisterValues) => registerUser(data),
  });

  // Expose useful mutation state and actions

  return { mutateAsync, error, isPending, registerData, isSuccess };
}
