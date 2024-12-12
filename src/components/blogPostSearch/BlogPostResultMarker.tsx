import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { Marker, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { ImageSwipeContainer } from "../blogPost/ImageSwipeContainer";

export type BlogPostResultMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostResultMarker: FunctionComponent<BlogPostResultMarkerProps> = (props) => {

    return <Marker
        icon={MarkerIcons.blogPost}
        position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]}>
        <Popup>
            <div className="min-w-24">
                <div className="w-full text-center text-xl font-bold">
                    {props.blogPost.title}
                </div>
                <ImageSwipeContainer rounded allowFullSizeView images={props.blogPost.images.map(i => i.imageId)} />
                <div className="max-w-48 truncate">
                    {props.blogPost.message}
                </div>
            </div>
        </Popup>

    </Marker>
}