import { BlogPostDto } from "./blogPostDto"
import { EntityBaseDto } from "./entityBaseDto"
import { TourDto } from "./tourDto"

export type TrackDto = EntityBaseDto & {
    tourPosition: number,
    name: string,
    fileReference: string,
    tour: TourDto,
    blogPosts: BlogPostDto[]
}