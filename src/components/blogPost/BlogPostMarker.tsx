import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { loadBlogPostDetailRequest } from "../../store/blogPostThunk";
import { setMarkerReferenceId } from "../../store/mapStateReducer";
import { isAllowedToEditBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "./ImageSwipeContainer";
import { setEditingBlogpost, setOpenedBlogPost, setSelectedBlogPost } from "../../store/blogPostStateReducer";
import { selectMarkerReference } from "../../store/trackStateReducer";
import { Timeouts } from "../../constants/Timeouts";

export type BlogPostMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostMarker: FunctionComponent<BlogPostMarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const allowedToEdit = useAppSelector((state) => isAllowedToEditBlogpost(state, props.blogPost));
    const blogPostState = useAppSelector((state) => state.blog);
    const editingId = blogPostState.editingBlogPost?.id;
    const markerPosition = useAppSelector((state) => state.map.markerPosition);
    const selectedMapMarker = useAppSelector((state) => state.map.markerReferenceId);
    const selectedTrackMarker = useAppSelector((state) => state.track.markerReferences.find(x => x.selected));
    const [popupOpen, setPopupOpen] = useState(selectedTrackMarker?.id === props.blogPost.id
        && selectedTrackMarker.type === 'blogPost');

    const [blogPost, setBlogPost] = useState<BlogPostDto | undefined>(undefined);

    const markerRef = useRef<any>(null);

    if (editingId === props.blogPost.id && markerPosition) {
        return <Marker icon={MarkerIcons.blogPostOld}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]} />
    }

    if (selectedTrackMarker && markerRef?.current) {
        const shouldBeOpen = selectedTrackMarker.id === props.blogPost.id
            && selectedTrackMarker.type === 'blogPost';

        // if (shouldBeOpen && !popupOpen) {
        //     setPopupOpen(true);
        //     markerRef.current.openPopup();
        // }
        if (!shouldBeOpen && popupOpen) {
            setPopupOpen(false);
            markerRef.current.closePopup();
        }
    }

    const loadDetails = () => {
        if (!blogPost) {
            dispatch(loadBlogPostDetailRequest(props.blogPost.id))
                .unwrap()
                .then(b => {
                    setBlogPost(b);
                    dispatch(setOpenedBlogPost(b));
                    dispatch(selectMarkerReference({
                        id: props.blogPost.id,
                        type: 'blogPost'
                    }));
            });
        }
        if (blogPost && blogPostState.openedBlogPost?.id !== blogPost.id) {
            dispatch(setOpenedBlogPost(blogPost));
            dispatch(selectMarkerReference({
                id: props.blogPost.id,
                type: 'blogPost'
            }));
        }
    }

    const openDetails = () => {
        dispatch(setSelectedBlogPost(blogPost));
        dispatch(selectMarkerReference({
            id: props.blogPost.id,
            type: 'blogPost'
        }));
    }

    const startEditing = () => {
        dispatch(setEditingBlogpost(blogPost));
        dispatch(selectMarkerReference({
            id: props.blogPost.id,
            type: 'blogPost'
        }));
    }

    if (selectedMapMarker?.id === props.blogPost.id && selectedMapMarker.type === 'blogPost' && markerRef?.current) {
        setTimeout(() => {
            markerRef.current.openPopup();
        }, Timeouts.FlyToDuration + 0.5);
        dispatch(setMarkerReferenceId());
        loadDetails();
    }

    if (selectedMapMarker !== undefined
        && (selectedMapMarker.id !== props.blogPost.id || selectedMapMarker.type !== 'blogPost')
        && markerRef?.current
    ) {
        markerRef.current.closePopup();
    }

    return <Marker icon={MarkerIcons.blogPost} ref={markerRef} 
        eventHandlers={{click: loadDetails}}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]}>
        <Popup className="marker-popup" >
            <div id={"blog-post-popup-" + blogPost?.id} className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">
                    {props.blogPost.title}
                </div>
                <ImageSwipeContainer rounded allowFullSizeView images={props.blogPost.images?.map(i => i.imageId) ?? []}/>
                {
                    props.blogPost.message ?
                    <div className="pt-2 max-w-48 text-left flex-none truncate">
                        {props.blogPost.message}
                    </div>
                    : <></>
                }
                <div>
                    <Button onClick={openDetails}>
                        <FontAwesomeIcon icon={faEye} />
                        &nbsp;Details
                    </Button>
                    {
                        allowedToEdit ?
                            <Button onClick={startEditing}>
                                <FontAwesomeIcon icon={faEdit} />
                                &nbsp;Edit
                            </Button>
                            : <></>
                    }
                </div>
            </div>
        </Popup>
    </Marker>
}