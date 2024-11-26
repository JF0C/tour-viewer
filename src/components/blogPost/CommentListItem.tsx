import { FunctionComponent } from "react";
import { fullDateString } from "../../converters/dateConverters";
import { CommentDto } from "../../dtos/comment/commentDto";
import { isAllowedToEditComment } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { EditableTextField } from "../shared/EditableTextField";
import { ProfilePicture } from "../user/ProfilePicture";
import { deleteCommentRequest, editCommentRequest } from "../../store/commentThunk";
import { loadBlogPostDetailRequest } from "../../store/blogPostThunk";
import { ConfirmModal } from "../shared/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export type CommentListItemProps = {
    blogPostId: number
    comment: CommentDto
}

export const CommentListItem: FunctionComponent<CommentListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const allowedToEdit = useAppSelector((state) => isAllowedToEditComment(state, props.comment));

    const editComment = (newContent: string) => {
        dispatch(editCommentRequest({
            blogPostId: props.blogPostId,
            commentId: props.comment.id,
            content: newContent
        }))
        .unwrap()
        .then(() => dispatch(loadBlogPostDetailRequest(props.blogPostId)));
    }

    const deleteComment = () => {
        dispatch(deleteCommentRequest({
            blogPostId: props.blogPostId,
            commentId: props.comment.id
        }))
        .unwrap()
        .then(() => dispatch(loadBlogPostDetailRequest(props.blogPostId)));
    }

    return <div className="p-2 border border-white rounded-md flex flex-row gap-2">
        <div>
            <ProfilePicture user={props.comment.author} size={50} />
        </div>
        <div>
            <div className="text-sm">
                {props.comment.author.username}
                &nbsp;-&nbsp;
                {fullDateString(props.comment.created)}
            </div>
            <div className="flex flex-row">
                {
                    allowedToEdit ? 
                    <EditableTextField name='' rows={2} onApply={editComment} value={props.comment.content} />
                    :<span>{props.comment.content}</span>
                }
                {
                    allowedToEdit ?
                    <ConfirmModal buttonContent={<FontAwesomeIcon icon={faTrash} />} type="error"
                        message="Delete comment?" onConfirm={deleteComment}/>
                    : <></>
                }
            </div>
        </div>
    </div>
}