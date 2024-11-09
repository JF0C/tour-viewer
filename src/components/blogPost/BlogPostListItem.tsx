import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { setFullSizeImages } from "../../store/blogPostStateReducer";

export type BlogPostListItemProps = {
    blogPost: BlogPostDto
}

export const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const showBlogpostOnMap = () => {
        navigate(Paths.HomePage);
    }

    return <div key={'blog-post-list-item-' + props.blogPost.id}
        className="flex flex-row justify-between items-center">
        <div className="flex-1">
            {props.blogPost.title}

        </div>
        <Button onClick={showBlogpostOnMap}>
            &nbsp;
            <FontAwesomeIcon icon={faMapPin} />
        </Button>
        {
            props.blogPost.images.length > 0 ?
            <Button onClick={() => dispatch(setFullSizeImages(props.blogPost.images.map(i => i.imageId)))}>
                <FontAwesomeIcon icon={faImage}/>
            </Button>
            : <></>
        }
    </div>
}