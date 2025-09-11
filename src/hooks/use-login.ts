"use client";

import { LoginValues } from "@/lib/schemes/login.scheme";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        // normalize error
        const message =
          response.error === "CredentialsSignin"
            ? "Invalid email or password"
            : response.error;

        throw new Error(message); // Throwing an Error object
      }

      return response;
    },
  });

  return { mutateAsync, error, isPending };
};
