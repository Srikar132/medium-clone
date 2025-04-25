import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  linkedin: z.string().transform(val => val === "" ? undefined : val).pipe(
    z.string().url("Invalid LinkedIn URL").optional()
  ),
  instagram: z.string().transform(val => val === "" ? undefined : val).pipe(
    z.string().url("Invalid Instagram URL").optional()
  ),
  facebook: z.string().transform(val => val === "" ? undefined : val).pipe(
    z.string().url("Invalid Facebook URL").optional()
  ),
  image: z.string().url("Invalid image URL"),
});


export const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(96, "Title is too long"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});