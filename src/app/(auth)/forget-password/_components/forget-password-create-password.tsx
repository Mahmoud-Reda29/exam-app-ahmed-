"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNewPasswordSchema,
  CreateNewPasswordValues,
} from "@/lib/schemes/forget-password.scheme";
import { MoveLeft } from "lucide-react";
import { PrevStepType } from "./steps-group";
import { useAddForgetPasswordCreatePassword } from "../_hooks/use-add-forget-password-create-password";
import { AuthError } from "@/components/auth-error";

// Forget password step: Create a new password
export default function ForgetPasswordCreatePassword({
  prevStep,
  email,
}: {
  prevStep: PrevStepType;
  email: string;
}) {
  const { error, isPending, ResetPassword } =
    useAddForgetPasswordCreatePassword();

  const form = useForm<CreateNewPasswordValues>({
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  const { isValid } = form.formState;

  // Handle form submission
  const onSubmit: SubmitHandler<CreateNewPasswordValues> = async (values) => {
    if (values?.newPassword) {
      const allValues = { email, newPassword: values.newPassword };

      ResetPassword(allValues, {
        onSuccess: () => {
          window.location.href = "/login";
        },
      });
    }
  };

  return (
    <div className="w-input p-6 bg-white font-mono">
      {/* Back button */}
      <button
        type="button"
        onClick={prevStep}
        className="mb-4 flex items-center justify-center text-gray-900 bg-transparent border-2 border-gray-200 hover:text-blue-700 size-10 "
        aria-label="Back"
      >
        <MoveLeft className="w-6 h-6" />
      </button>

      {/* Heading and description */}
      <div className="mb-4 flex items-start justify-center gap-2 flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
          Create a New Password
        </h1>
        <p className="text-base text-gray-500 font-mono mb-6 font-normal">
          Create a new strong password for your account.
        </p>
      </div>

      {/* Password form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-6"
        >
          {/* New Password */}
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    aria-invalid={!!form.formState.errors.newPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm New Password */}
          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    aria-invalid={!!form.formState.errors.rePassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* API Error */}
          {error && <AuthError error={error.message} />}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 "
            disabled={!isValid}
          >
            {isPending ? "Loading..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
