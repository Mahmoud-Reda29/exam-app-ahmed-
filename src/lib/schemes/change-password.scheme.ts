import z from "zod";

export const changePasswordScheme = z
  .object({
    oldPassword: z.string().min(8),
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
      .min(8, "rePassword must be at least 8 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
export type ChangePasswordValues = z.infer<typeof changePasswordScheme>;
