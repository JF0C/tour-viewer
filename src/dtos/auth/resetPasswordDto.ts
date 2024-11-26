import { z } from "zod";

export const ResetPasswordSchema = z.object({
    email: z.string().min(3).max(100),
    code: z.string().min(5).max(10),
    password: z.string().min(8).max(50)
})

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
