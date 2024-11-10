import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setFullSizeImages, setOpenMarker } from "../../store/blogPostStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { setTargetCoordinates } from "../../store/trackStateReducer";

export type BlogPostListItemProps = {
    blogPost: BlogPostDto
}

export const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectedTourId = useAppSelector((state) => state.tour.selectedTour?.id);

    const showBlogpostOnMap = () => {
        if (selectedTourId !== props.blogPost.track.tour?.id) {
            if (props.blogPost.track.tour) {
                dispatch(loadTourRequest(props.blogPost.track.tour.id))
                    .then(() =>
                        setTimeout(() => {
                            dispatch(setTargetCoordinates(props.blogPost.coordinates));
                            dispatch(setOpenMarker(props.blogPost.id));
                        }, 1000)
                    );
            }
        }
        else {
            dispatch(setTargetCoordinates(props.blogPost.coordinates));
            dispatch(setOpenMarker(props.blogPost.id));
        }
        navigate(Paths.HomePage);
    }

    return <div key={'blog-post-list-item-' + props.blogPost.id}
        className="flex flex-row justify-between items-center">
        <div className="flex-1">
            [{props.blogPost.track.tour?.name}]
            &nbsp;
            {props.blogPost.title}
        </div>
        <Button onClick={showBlogpostOnMap}>
            &nbsp;
            <FontAwesomeIcon icon={faMapPin} />
        </Button>
        {
            props.blogPost.images.length > 0 ?
                <Button onClick={() => dispatch(setFullSizeImages(props.blogPost.images.map(i => i.imageId)))}>
                    <FontAwesomeIcon icon={faImage} />
                </Button>
                : <></>
        }
    </div>
}