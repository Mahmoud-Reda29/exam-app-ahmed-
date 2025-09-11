"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  changePasswordScheme,
  ChangePasswordValues,
} from "@/lib/schemes/change-password.scheme";
import { useChangePassword } from "../_hooks/use-change-password-account";
import { signOut } from "next-auth/react";
import { AuthError } from "@/components/auth-error";

export default function AccountChangePassword() {
  const { error, isPending, mutateAsync } = useChangePassword();
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordScheme),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordValues> = async (values) => {
    await mutateAsync(values, {
      onSuccess: (data) => {
        console.log(data);
        signOut();
      },
    });
  };

  return (
    <div className="font-mono text-gray-800 font-medium text-base">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values: ChangePasswordValues) =>
            onSubmit(values)
          )}
          className="flex flex-col gap-6 "
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <AuthError error={error?.message} />}
          <Button
            type="submit"
            className="w-full p-3 flex justify-center items-center"
            disabled={isPending || !form.formState.isValid}
            variant={"default"}
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
