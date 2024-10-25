import { z } from 'zod'

export const ChangePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8).max(50)
})

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>
