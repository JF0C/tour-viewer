import { BlogPostDto } from "./blogPostDto"
import { EntityBaseDto } from "./entityBaseDto"

export type TrackDto = EntityBaseDto & {
    tourPosition: number,
    name: string,
    fileReference: string,
    blogPosts: BlogPostDto[]
}