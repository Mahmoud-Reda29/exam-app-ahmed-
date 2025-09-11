import { useMutation } from "@tanstack/react-query";
import { checkQuestions } from "../_actions/check-questions.action";
import { CheckRequest } from "@/lib/types/check-questions";

export function useCheckQuestions() {
  const { mutateAsync, error, isPending, data, isSuccess } = useMutation({
    mutationFn: (data: CheckRequest) => checkQuestions(data),
  });
  return { mutateAsync, error, isPending, isSuccess, data };
}
