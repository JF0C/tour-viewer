import { BlogPostDto } from "../blogPost/blogPostDto"
import { PagedResult } from "../shared/pagedResult"
import { TourDto } from "../tour/tourDto"

export type UserDetailDto = {
    id: number
    username: string
    profilePictureId?: string
    profilePictureParameters?: string
    tours?: PagedResult<TourDto>
    toursPerPage: number
    blogPosts?: PagedResult<BlogPostDto>
    blogPostsPerPage: number
}