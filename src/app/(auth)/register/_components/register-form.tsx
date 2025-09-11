"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { RegisterSchema, RegisterValues } from "@/lib/schemes/register.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "./phone-number-input";
import { useRegisterUser } from "../_hooks/use-register";
import { AuthError } from "@/components/auth-error";

export function RegisterForm() {
  // Setup form with validation schema and default values
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  const { isValid, isSubmitted } = form.formState;
  const { mutateAsync, error, isPending } = useRegisterUser();

  // Handle submit and call register API
  const onSubmit = async (values: RegisterValues) => {
    const phone =
      typeof values.phone === "string" ? values.phone.slice(2) : values.phone;
    const submitValues: RegisterValues = { ...values, phone };

    await mutateAsync(submitValues, {
      onSuccess: () => {
        // Redirect to login after successful register
        window.location.href = "/login";
      },
    });
  };

  return (
    <div className={"flex flex-col gap-6 font-mono"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* First + Last Name fields */}

          <div className="flex justify-center items-center gap-3">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ahmed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-800">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Abdullah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Username field */}

          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Username
                </FormLabel>
                <FormControl>
                  <Input placeholder="user123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone field */}

          <FormField
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Phone
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry="EG"
                    placeholder="0123456789"
                    error={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
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

          {/* Confirm Password field */}

          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-800">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error display */}

          <div> {error && <AuthError error={error.message} />}</div>

          {/* Submit button */}

          <div>
            <Button
              type="submit"
              className="w-input h-11 text-sm font-medium text-white bg-blue-600"
              disabled={!isValid && isSubmitted}
            >
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Login link */}

      <div className="text-center text-sm font-medium text-gray-500">
        Already have an account?
        <Link href="/login" className="text-blue-600 ml-2">
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
