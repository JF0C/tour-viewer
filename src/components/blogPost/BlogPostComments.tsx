import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { CommentListItem } from "./CommentListItem";
import { CreateCommentInput } from "./CreateCommentInput";

export type BlogPostCommentsProps = {
    blogPost: BlogPostDto
}

export const BlogPostComments: FunctionComponent<BlogPostCommentsProps> = (props) => {

    return <div>
        {props.blogPost.comments?.map(c => <CommentListItem comment={c} /> )}
        <CreateCommentInput blogPostId={props.blogPost.id} />
    </div>
}