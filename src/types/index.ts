import { userSelectSchema } from "@/schema";
import { z } from "zod";
import { de } from "zod/v4/locales";

export const loginFormSchema = z.object({
  email: userSelectSchema.shape.email, // Reuse email validation from Drizzle schema
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const projectFormSchema = z.object({
  framework: z.enum([
    "vanilla",
    "react",
    "next",
    "vue",
    "svelte",
    "angular",
    "nuxt",
    "sveltekit",
    "astro",
    "remix",
    "tanstack",
  ]),
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  frameworkVersion: z.string().min(1, "Framework version is required"),
  platform: z.string().min(1, "Platform is required"),
  dependencies: z.array(z.string()),
});

export type ProjectForm = z.infer<typeof projectFormSchema>;
