import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { removeLabelFromBlogPostRequest } from "../../store/blogPostLabelThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { loadBlogPostDetailRequest } from "../../store/blogPostThunk";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";

export type BlogPostLabelProps = {
    label: string
    blogPostId?: number
}

export const BlogPostLabel: FunctionComponent<BlogPostLabelProps> = (props) => {
    const dispatch = useAppDispatch();

    const removeLabel = (blogPostId: number) => {
        if (!props.blogPostId) {return;}
        dispatch(removeLabelFromBlogPostRequest({
            blogPostId: blogPostId,
            label: props.label
        })).unwrap().then(() => {
            dispatch(loadBlogPostDetailRequest(blogPostId))
                .unwrap().then(b => dispatch(setEditingBlogpost(b)));
        });
    }
    return <div className="flex flex-row gap-2 items-center border border-white rounded-full px-2">
        <div>{props.label}</div>
        {
            props.blogPostId ?
            <div onClick={() => removeLabel(props.blogPostId!)} style={{color:'red', cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faXmarkCircle}/>
            </div>  
            :<></>
        }  
    </div>
}