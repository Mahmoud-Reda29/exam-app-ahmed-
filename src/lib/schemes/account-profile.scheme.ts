import z from "zod";

export const AccountProfileScheme = z.object({
  firstName: z
    .string("Firstname is empty !!")
    .nonempty("Firstname is empty !!"),
  lastName: z.string("Lastname is empty !!").nonempty("Lastname is empty !!"),
  username: z
    .string("UserName is required")
    .nonempty("UserName is required")
    .min(3, "UserName must be at least 3 characters"),
  email: z
    .string("Email invalid")
    .email("Email invalid")
    .nonempty("Email is empty !!"),
  phone: z
    .string("Phone is required")
    .nonempty("Phone is required")
    .regex(
      /^\+20[0-9]{10}$/,
      "Phone must be in format +20XXXXXXXXXX (e.g. +2001016881875)"
    ),
});

export type AccountProfileValues = z.infer<typeof AccountProfileScheme>;
