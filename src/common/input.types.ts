import z from "zod";

export const registerUserSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export type registerUserInputs = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type loginUserInputs = z.infer<typeof loginUserSchema>;
