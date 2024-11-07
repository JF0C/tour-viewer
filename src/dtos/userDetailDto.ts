import { BlogPostDto } from "./blogPostDto"
import { PagedResult } from "./pagedResult"
import { TourDto } from "./tourDto"

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