import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z.string("Password is required").nonempty("Password is required"),
});
export type LoginValues = z.infer<typeof LoginSchema>;
