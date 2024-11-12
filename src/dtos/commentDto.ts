import { EntityBaseDto } from "./entityBaseDto"
import { UserReferenceDto } from "./userReferenceDto"

export type CommentDto = EntityBaseDto & {
    content: string
    author: UserReferenceDto
}