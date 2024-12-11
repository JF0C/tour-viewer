import { Button, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createCommentRequest } from "../../store/commentThunk";
import { loadBlogPostDetailRequest, reloadBlogPostForTour } from "../../store/blogPostThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export type CreateCommentInputProps = {
    blogPostId: number
}

export const CreateCommentInput: FunctionComponent<CreateCommentInputProps> = (props) => {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState('');

    const sendComment = () => {
        dispatch(createCommentRequest({
            blogPostId: props.blogPostId,
            content: content
        }))
        .unwrap()
        .then(() => {
            dispatch(loadBlogPostDetailRequest(props.blogPostId));
        });
    }

    return <div className="flex flex-row w-full">
        <TextField className="flex-1" multiline label='Add Comment' size='small' 
            onChange={(e) => setContent(e.target.value)} />
        <Button onClick={sendComment}>
            <FontAwesomeIcon icon={faComment} />
        </Button>
    </div>
}