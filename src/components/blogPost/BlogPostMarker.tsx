import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { loadBlogPostDetailRequest } from "../../store/blogPostThunk";
import { isAllowedToEditBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "./ImageSwipeContainer";
import { setMarkerReferenceId } from "../../store/mapStateReducer";

export type BlogPostMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostMarker: FunctionComponent<BlogPostMarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const allowedToEdit = useAppSelector((state) => isAllowedToEditBlogpost(state, props.blogPost));
    const editingId = useAppSelector((state) => state.blog.editingBlogPost?.id);
    const markerPosition = useAppSelector((state) => state.map.markerPosition);
    const openMarker = useAppSelector((state) => state.map.markerReferenceId);

    const markerRef = useRef<any>(null);

    if (editingId === props.blogPost.id && markerPosition) {
        return <Marker icon={MarkerIcons.postOld}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]} />
    }

    const startEditing = () => {
        dispatch(setEditingBlogpost({
            id: props.blogPost.id,
            trackId: props.blogPost.track.id,
            trackFileReference: props.blogPost.track.fileReference,
            images: props.blogPost.images.map(i => i.imageId),
            title: props.blogPost.title,
            message: props.blogPost.message,
            latitude: props.blogPost.coordinates.latitude,
            longitude: props.blogPost.coordinates.longitude,
            labels: props.blogPost.labels
        }))
    }

    const viewBlogPostDetail = () => {
        dispatch(loadBlogPostDetailRequest(props.blogPost.id));
    }

    if (openMarker === props.blogPost.id && markerRef && markerRef.current) {
        setTimeout(() => markerRef.current.openPopup(), 5000);
        dispatch(setMarkerReferenceId());
    }

    return <Marker icon={MarkerIcons.postWhite} ref={markerRef}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]}>
        <Popup className="marker-popup">
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">
                    {props.blogPost.title}
                </div>
                <ImageSwipeContainer allowFullSizeView images={props.blogPost.images?.map(i => i.imageId) ?? []}/>
                {
                    props.blogPost.message ?
                    <div className="pt-2 max-w-48 text-left flex-none truncate">
                        {props.blogPost.message}
                    </div>
                    : <></>
                }
                <div>
                    <Button onClick={viewBlogPostDetail}>
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