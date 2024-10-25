import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().min(3).max(100),
    password: z.string().min(8).max(50)
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
