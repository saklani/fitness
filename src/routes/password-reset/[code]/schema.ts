import { z } from "zod";

export const formSchema = z.object({
    password: z.string().min(2),
});

export type FormSchema = typeof formSchema;