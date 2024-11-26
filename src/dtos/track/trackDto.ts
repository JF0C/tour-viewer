import { BlogPostDto } from "../blogPost/blogPostDto"
import { EntityBaseDto } from "../shared/entityBaseDto"
import { TourDto } from "../tour/tourDto"

export type TrackDto = EntityBaseDto & {
    tourPosition: number,
    name: string,
    fileReference: string,
    tour?: TourDto,
    blogPosts: BlogPostDto[]
}