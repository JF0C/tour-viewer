import { FunctionComponent } from "react";
import { CommentDto } from "../../dtos/commentDto";

export type CommentListItemProps = {
    comment: CommentDto
}

export const CommentListItem: FunctionComponent<CommentListItemProps> = (props) => {

    return <div>
        {props.comment.content}
    </div>
}