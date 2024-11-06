import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { Marker, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { setEditingBlogpost, setSelectedBlogpost } from "../../store/blogPostStateReducer";
import { isAllowedToEditBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "./ImageSwipeContainer";

export type BlogPostMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostMarker: FunctionComponent<BlogPostMarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const allowedToEdit = useAppSelector((state) => isAllowedToEditBlogpost(state, props.blogPost));
    const editingId = useAppSelector((state) => state.blog.editingBlogPost?.id);
    const markerPosition = useAppSelector((state) => state.blog.markerPosition);

    if (editingId === props.blogPost.id && markerPosition) {
        console.log("editing location of blog post " + props.blogPost.title)
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
            longitude: props.blogPost.coordinates.longitude
        }))
    }

    return <Marker icon={MarkerIcons.postWhite}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]}>
        <Popup>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">
                    {props.blogPost.title}
                </div>
                <ImageSwipeContainer images={props.blogPost.images?.map(i => i.imageId) ?? []}/>
                <div>
                    <Button onClick={() => dispatch(setSelectedBlogpost(props.blogPost))}>
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