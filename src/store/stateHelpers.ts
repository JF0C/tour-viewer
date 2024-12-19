import { Roles } from "../constants/Rolenames";
import { Timeouts } from "../constants/Timeouts";
import { trackClosestToPoint } from "../converters/trackDataClosestToPoint";
import { TrackEntity } from "../data/trackEntity";
import { BlogPostDto } from "../dtos/blogPost/blogPostDto";
import { CommentDto } from "../dtos/comment/commentDto";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { EntityBaseDto } from "../dtos/shared/entityBaseDto";
import { TourDto } from "../dtos/tour/tourDto";
import { UserDetailDto } from "../dtos/user/userDetailDto";
import { changeEditingBlogpostPosition, changeEditingBlogpostTrack, setEditingBlogpost } from "./blogPostStateReducer";
import { loadBlogPostDetailRequest, searchBlogPostsForUser } from "./blogPostThunk";
import { IMapState, setClickedEvent, setMarkerDragging, setMarkerPosition } from "./mapStateReducer";
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
    dispatch(loadBlogPostDetailRequest(blogPostId))
        .unwrap()
        .then(b => dispatch(setEditingBlogpost(b)));
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

export const createNewBlogPost = (dispatch: AppDispatch, coordinates: CoordinatesDto, selectedTracks: TrackEntity[]) => {
    const track = trackClosestToPoint(selectedTracks, coordinates);
    dispatch(setEditingBlogpost({
        id: 0,
        author: { username: '', id: 0 },
        coordinates: coordinates,
        title: '',
        message: '',
        images: [],
        tourTime: 0,
        track: {
            id: track?.id ?? 0,
            created: 0,
            tourPosition: track?.tourPosition ?? 0,
            name: track?.data.name ?? '',
            fileReference: track?.fileReference ?? '',
            blogPosts: []
        },
        country: { code: 'XX', name: 'none', id: 0, inUse: true },
        labels: [],
        created: 0
    }));
}

export const mapClickEnd = (dispatch: AppDispatch,
    mapState: IMapState,
    selectedTracks: TrackEntity[],
    canEdit: boolean,
    isContributor: boolean,
    isEditingBlogPost: boolean
) => {

    if (mapState.isDraggingMarker || !canEdit) {
        return;
    }

    const timeDelta = Date.now() - mapState.clickedEvent.time;
    if (timeDelta > Timeouts.CreateBlogPostHold && isContributor && mapState.clickedEvent.location) {
        dispatch(setMarkerPosition(mapState.clickedEvent.location));
        if (!isEditingBlogPost) {
            createNewBlogPost(dispatch, mapState.clickedEvent.location, selectedTracks);
        }
        else {
            dispatch(changeEditingBlogpostPosition(mapState.clickedEvent.location));
        }
    }
    dispatch(setClickedEvent(undefined));
}

export const markerDragEnd = (dispatch: AppDispatch,
    endPosition: CoordinatesDto,
    selectedTracks: TrackEntity[]
) => {
    dispatch(changeEditingBlogpostPosition(endPosition));
    dispatch(setMarkerPosition(endPosition));

    const track = trackClosestToPoint(selectedTracks, endPosition);

    dispatch(changeEditingBlogpostTrack({
        trackId: track?.id ?? 0,
        trackFileReference: track?.fileReference ?? ''
    }));
    setTimeout(() => dispatch(setMarkerDragging(false)), 50);
}

export const setDateNumbers = (entity: EntityBaseDto) => {
    entity.created = new Date(entity.created).valueOf();
    if (entity.modified) {
        entity.modified = new Date(entity.modified).valueOf();
    }
}
