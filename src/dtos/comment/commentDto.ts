import { EntityBaseDto } from "../shared/entityBaseDto"
import { UserReferenceDto } from "../user/userReferenceDto"

export type CommentDto = EntityBaseDto & {
    content: string
    author: UserReferenceDto
}