import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2).max(50)
});

export type FormSchema = typeof formSchema;