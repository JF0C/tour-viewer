import { faCheck, faLocation, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { changeEditingBlogpostPosition, changeEditingBlogpostTrack, resetCoordinatesChanged, setMarkerPosition } from "../../store/blogPostStateReducer";
import { changeBlogPostLocationRequest } from "../../store/blogPostThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { updateEditingBlogpost } from "../../store/stateHelpers";
import { trackClosestToPoint } from "../../converters/trackDataClosestToPoint";

export const BlogPostLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);
    const coordinatesChanged = useAppSelector((state) => state.blog.coordinatesChanged);
    const mapCenter = useAppSelector((state) => state.blog.mapCenter);
    const tourId = useAppSelector((state) => state.tour.selectedTour?.id);
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected));
    const tourTracks = useAppSelector((state) => state.tour.selectedTour?.tracks);

    if (!blogPost || !tourId) {
        return <></>
    }

    const changeLocation = () => {
        dispatch(setMarkerPosition());
        const blogPostId = blogPost.id;
        dispatch(changeBlogPostLocationRequest({
            id: blogPostId,
            coordinates: {
                latitude: blogPost.latitude,
                longitude: blogPost.longitude
            }
        })).then(() => {
            dispatch(loadTourRequest(tourId))
                .unwrap()
                .then(tour => {
                    updateEditingBlogpost(dispatch, tour, blogPostId);
                })
        })
    }

    const resetLocation = () => {
        dispatch(setMarkerPosition());
        dispatch(resetCoordinatesChanged());
    }

    const startEditingBlogPostTrack = () => {
        if (!mapCenter) {
            return;
        }

        dispatch(setMarkerPosition({
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude
        }));

        dispatch(changeEditingBlogpostPosition({
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude
        }));

        const fileId = trackClosestToPoint(selectedTracks, mapCenter)?.fileReference ?? '';
        const trackId = tourTracks?.find(t => t.fileReference === fileId)?.id ?? 0;
        dispatch(changeEditingBlogpostTrack({trackId: trackId, trackFileReference: fileId}));
    }

    return <div>
        Coordinates:&nbsp;
        {blogPost.latitude.toFixed(4)}, {blogPost.longitude.toFixed(4)}
        <Button onClick={startEditingBlogPostTrack}>
            <FontAwesomeIcon icon={faLocation} />
        </Button>
        {
            coordinatesChanged ?
                <Button onClick={changeLocation}>
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
                : <></>
        }
        {
            coordinatesChanged ?
                <Button color='error' onClick={resetLocation}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
                : <></>
        }
    </div>
}