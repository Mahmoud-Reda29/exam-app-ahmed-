import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string("FirstName is required")
      .nonempty("FirstName is required")
      .min(3, "FirstName must be at least 3 characters"),
    lastName: z
      .string("LastName is required")
      .nonempty("LastName is required")
      .min(3, "LastName must be at least 3 characters"),
    username: z
      .string("UserName is required")
      .nonempty("UserName is required")
      .min(3, "UserName must be at least 3 characters"),
    email: z
      .string("Email is required")
      .nonempty("Email is required")
      .email("Email is invalid"),
    phone: z
      .string("Phone is required")
      .nonempty("Phone is required")
      .regex(
        /^\+20[0-9]{10}$/,
        "Phone must be in format +20XXXXXXXXXX (e.g. +2001016881875)"
      ),
    password: z
      .string("Password is required")
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
      ),
    rePassword: z
      .string("rePassword is required")
      .nonempty("rePassword is required")
      .min(6, "rePassword must be at least 6 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });
export type RegisterValues = z.infer<typeof RegisterSchema>;
