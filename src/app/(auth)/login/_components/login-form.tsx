"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, type LoginValues } from "@/lib/schemes/login.scheme";
import Link from "next/link";
import { useLogin } from "@/hooks/use-login";
import { AuthError } from "@/components/auth-error";

export function LoginForm() {
  // Setup form with validation and defaults

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Hook for login mutation

  const { mutateAsync, isPending, error: loginError } = useLogin();

  // Handle form submit

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    await mutateAsync(values, {
      onSuccess: () => {
        // Redirect after login
        const callbackUrl =
          new URLSearchParams(window.location.search).get("callbackUrl") || "/";
        window.location.href = callbackUrl;
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 font-mono">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Email field */}

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
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Password field */}

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot password link */}

          <div className="flex justify-end text-blue-600 text-sm mt-2">
            <Link
              href="/forget-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* API error */}

          {loginError && <AuthError error={loginError.message} />}

          {/* Submit button */}

          <div>
            <Button
              type="submit"
              className="w-input h-11 text-sm font-medium text-white bg-blue-600"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Register link */}

      <div className="text-center text-sm font-medium text-gray-500">
        Don&apos;t have an account?
        <Link href="/register" className="text-blue-600 ml-2">
          Create yours
        </Link>
      </div>
    </div>
  );
}
