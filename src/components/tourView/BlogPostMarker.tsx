import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { Marker, Popup } from "react-leaflet";

export type BlogPostMarkerProps = {
    blogPost: BlogPostDto
}

export const BlogPostMarker: FunctionComponent<BlogPostMarkerProps> = (props) => {

    return <Marker position={[props.blogPost.coordinates.latitude, props.blogPost.coordinates.longitude]}>
        <Popup>
            { props.blogPost.title }
        </Popup>
    </Marker>
}