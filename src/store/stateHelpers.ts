import { Roles } from "../constants/Rolenames";
import { BlogPostDto } from "../dtos/blogPostDto";
import { TourDto } from "../dtos/tourDto";
import { setEditingBlogpost } from "./blogPostStateReducer";
import { AppDispatch, RootState } from "./store";

export const isAllowedToCreate = (state: RootState): boolean => {
    const user = state.auth.user;
    const tour = state.tour.selectedTour;
    if (!user || !tour) {
        return false;
    }
    return (Boolean(tour.participants.find(p => p.id === user.id)) && user.roles.includes(Roles.Contributor)) 
        || user.roles.includes(Roles.Admin);
}

export const isAllowedToEditBlogpost = (state: RootState, blogPost: BlogPostDto): boolean => {
    const user = state.auth.user;
    if (!user) {
        return false;
    }
    if (user.roles.includes(Roles.Admin)) {
        return true;
    }
    if (user.roles.includes(Roles.Contributor) && blogPost.author.id === user.id) {
        return true;
    }
    return false;
}

export const updateEditingBlogpost = (dispatch: AppDispatch, tour: TourDto, blogPostId: number) => {
    for (let track of tour.tracks) {
        for (let blog of track.blogPosts) {
            if (blog.id === blogPostId) {
                dispatch(setEditingBlogpost({
                    id: blog.id,
                    latitude: blog.coordinates.latitude,
                    longitude: blog.coordinates.longitude,
                    trackId: track.id,
                    trackFileReference: track.fileReference,
                    title: blog.title,
                    message: blog.message,
                    images: blog.images.map(i => i.imageId)
                }));
            }
        }
    }
}
