import { z } from "zod"


export const ChangeUsernameSchema = z.object({
    id: z.number(),
    username: z.string().min(3).max(20)
})

export type ChangeUsernameDto = z.infer<typeof ChangeUsernameSchema>
