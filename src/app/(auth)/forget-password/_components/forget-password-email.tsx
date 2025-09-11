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
  EmailForgetPasswordSchema,
  EmailForgetPasswordValue,
} from "../../../../lib/schemes/forget-password.scheme";
import { MoveRight } from "lucide-react";
import { NextStepType } from "./steps-group";
import { useAddForgetPasswordEmail } from "../_hooks/use-add-forget-password-email";
import { AuthError } from "@/components/auth-error";

// component handles first step of "forgot password" flow
export default function ForgetPasswordEmail({
  nextStep,
  setEmail,
}: {
  nextStep: NextStepType;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  // hook to send email request
  const { mutateAsync, error, isPending } = useAddForgetPasswordEmail();

  // form config with zod validation
  const form = useForm({
    resolver: zodResolver(EmailForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isValid } = form.formState;

  // handle submit
  const onSubmit: SubmitHandler<EmailForgetPasswordValue> = async (values) => {
    const res = await mutateAsync(values, {
      onSuccess: () => {
        form.reset();
        setEmail(values.email);
        nextStep();
      },
    });
    console.log(res);
  };

  return (
    <div className="max-w-md mx-auto rounded-lg p-6 bg-white font-mono">
      <div className="mb-4   items-start justify-center gap-2 flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
          Forgot Password
        </h1>
        <p className="text-base text-gray-500 font-mono mb-6 font-normal">
          Don&apos;t worry, we will help you recover your account.
        </p>
      </div>

      {/* simple form to collect user email */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-6"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" flex flex-col gap-10">
            {error && <AuthError error={error.message} />}
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full h-11 bg-blue-600 text-white font-medium flex justify-center items-center gap-2"
            >
              <span>Continue</span> <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
