import z from "zod";

export const EmailForgetPasswordSchema = z.object({
  email: z
    .string("Email ie required")
    .nonempty("Email is required")
    .email("You have to set an email"),
});

export type EmailForgetPasswordValue = z.infer<
  typeof EmailForgetPasswordSchema
>;

export const ResetCodeSchema = z.object({
  resetCode: z.string().length(6, "OTP must be 6 digits"),
});

export type ResetCodeValues = z.infer<typeof ResetCodeSchema>;

export const CreateNewPasswordSchema = z
  .object({
    newPassword: z
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
      .min(8, "rePassword must be at least 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
      ),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

export type CreateNewPasswordValues = z.infer<typeof CreateNewPasswordSchema>;
