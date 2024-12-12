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
import { setEditingBlogpost, setSelectedBlogPost } from "../../store/blogPostStateReducer";

export type BlogPostMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostMarker: FunctionComponent<BlogPostMarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const allowedToEdit = useAppSelector((state) => isAllowedToEditBlogpost(state, props.blogPost));
    const blogPostState = useAppSelector((state) => state.blog);
    const editingId = blogPostState.editingBlogPost?.id;
    const markerPosition = useAppSelector((state) => state.map.markerPosition);
    const openMarker = useAppSelector((state) => state.map.markerReferenceId);

    const [blogPost, setBlogPost] = useState<BlogPostDto | undefined>(undefined);

    const markerRef = useRef<any>(null);

    if (editingId === props.blogPost.id && markerPosition) {
        return <Marker icon={MarkerIcons.blogPostOld}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]} />
    }

    const loadDetails = () => {
        dispatch(loadBlogPostDetailRequest(props.blogPost.id))
            .unwrap()
            .then(b => setBlogPost(b));
    }

    const openDetails = () => {
        dispatch(setSelectedBlogPost(blogPost));
    }

    const startEditing = () => {
        dispatch(setEditingBlogpost(blogPost));
    }

    if (openMarker === props.blogPost.id && markerRef && markerRef.current) {
        setTimeout(() => markerRef.current.openPopup(), 5000);
        dispatch(setMarkerReferenceId());
    }

    return <Marker icon={MarkerIcons.blogPost} ref={markerRef} 
        eventHandlers={{click: loadDetails}}
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