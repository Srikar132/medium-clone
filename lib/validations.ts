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