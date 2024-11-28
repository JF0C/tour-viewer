import { Roles } from "../constants/Rolenames";
import { Timeouts } from "../constants/Timeouts";
import { trackClosestToPoint } from "../converters/trackDataClosestToPoint";
import { TrackEntity } from "../data/trackEntity";
import { BlogPostDto } from "../dtos/blogPost/blogPostDto";
import { CommentDto } from "../dtos/comment/commentDto";
import { TourDto } from "../dtos/tour/tourDto";
import { UserDetailDto } from "../dtos/user/userDetailDto";
import { changeEditingBlogpostPosition, setEditingBlogpost } from "./blogPostStateReducer";
import { searchBlogPostsForUser } from "./blogPostThunk";
import { IMapState, setClickedEvent, setMarkerPosition } from "./mapStateReducer";
import { AppDispatch, RootState } from "./store";
import { searchToursForUser } from "./tourThunk";

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

export const isAllowedToEditComment = (state: RootState, comment: CommentDto): boolean => {
    const user = state.auth.user;
    if (!user) {
        return false;
    }
    if (user.roles.includes(Roles.Admin)) {
        return true;
    }
    if (user.roles.includes(Roles.Contributor) && comment.author.id === user.id) {
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

export const loadUserDetail = (dispatch: AppDispatch, detailedUser: UserDetailDto) => {
    dispatch(searchToursForUser({
        page: detailedUser.tours?.page ?? 1,
        count: detailedUser.toursPerPage,
        participantId: detailedUser.id
    }));
    dispatch(searchBlogPostsForUser({
        page: detailedUser.blogPosts?.page ?? 1,
        count: detailedUser.blogPostsPerPage,
        author: detailedUser.id
    }))
}

export const mapClickEnd = (dispatch: AppDispatch,
    mapState: IMapState,
    selectedTracks: TrackEntity[],
    isContributor: boolean,
    isEditingBlogPost: boolean
) => {

    if (mapState.isDraggingMarker) {
        return;
    }

    const timeDelta = Date.now() - mapState.clickedEvent.time;
    if (timeDelta > Timeouts.CreateBlogPostHold && isContributor && mapState.clickedEvent.location) {
        dispatch(setMarkerPosition(mapState.clickedEvent.location));
        if (!isEditingBlogPost) {
            const track = trackClosestToPoint(selectedTracks, mapState.clickedEvent.location);
            dispatch(setEditingBlogpost({
                id: 0,
                latitude: mapState.clickedEvent.location.latitude,
                longitude: mapState.clickedEvent.location.longitude,
                title: '',
                message: '',
                images: [],
                trackId: track?.id ?? 0,
                trackFileReference: track?.fileReference ?? ''
            }))
        }
        else {
            dispatch(changeEditingBlogpostPosition(mapState.clickedEvent.location));
        }
    }
    dispatch(setClickedEvent(undefined));
}

