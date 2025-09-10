import { userSelectSchema } from "@/schema";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: userSelectSchema.shape.email, // Reuse email validation from Drizzle schema
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
