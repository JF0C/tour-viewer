import { BlogPostDto } from "./blogPostDto"
import { TourDto } from "./tourDto"

export type UserDetailDto = {
    id: number
    username: string
    profilePictureId?: string
    profilePictureParameters?: string
    tours: TourDto[]
    blogPosts: BlogPostDto[]
}