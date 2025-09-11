"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  AccountProfileScheme,
  AccountProfileValues,
} from "@/lib/schemes/account-profile.scheme";
import { PhoneInput } from "@/components/ui/phone-number-input";
import { signOut, useSession } from "next-auth/react";
import { ProfileAccountSkeleton } from "@/components/skeletons/account-profile/skeleton";
import { useUpdateAccountProfile } from "../_hooks/use-update-account-profile";
import DeleteAccountDialog from "./delete-account-dialog";
import { AuthError } from "@/components/auth-error";
import { useDeleteAccount } from "../_hooks/use-delete-account";

const ProfileAccount = () => {
  const { data: session, status, update } = useSession();
  const { error, mutateAsync, isPending } = useUpdateAccountProfile();
  console.log(session);

  const form = useForm<AccountProfileValues>({
    resolver: zodResolver(AccountProfileScheme),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
  });
  const { dirtyFields } = form.formState;
  const {
    error: deleteError,
    isPending: deleteIsPending,
    mutateAsync: deleteFn,
  } = useDeleteAccount();
  const onDelete = async () => {
    const res = await deleteFn();
    if (res) {
      signOut();
    }
  };

  // Reset form with session data
  useEffect(() => {
    if (session) {
      form.reset({
        firstName: session.firstName ?? "",
        lastName: session.lastName ?? "",
        username: session.username ?? "",
        email: session.email ?? "",
        phone: `+2${session.phone}`,
      });
    }
  }, [session, form]);

  if (status === "loading" || !session) {
    return <ProfileAccountSkeleton />;
  }

  const { isValid } = form.formState;

  const onSubmit = async (values: AccountProfileValues) => {
    const phone =
      typeof values.phone === "string" ? values.phone.slice(2) : values.phone;
    const submitValues: AccountProfileValues = { ...values, phone };
    const changed: UpdateProfileType = {};

    Object.keys(dirtyFields).forEach((key) => {
      changed[key as keyof UpdateProfileType] =
        submitValues[key as keyof AccountProfileValues];
    });

    if (Object.keys(changed).length > 0) {
      await mutateAsync(changed, {
        onSuccess: async () => {
          // ✅ request new token/session
          await update(changed);
          console.log("Profile updated & token refreshed");
        },
      });
    }
  };

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <div className="bg-white overflow-hidden p-3 shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {/* First + Last name */}
            <div className="flex justify-center items-center gap-3">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdullah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Username */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="user123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="EG"
                      placeholder="+20123456789"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <AuthError error={error.message} />}
            {deleteError && <AuthError error={deleteError.message} />}
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <DeleteAccountDialog
                onConfirm={() => onDelete()}
                isPending={deleteIsPending}
              />

              <Button
                type="submit"
                className="w-full "
                disabled={isPending || !isValid}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileAccount;
