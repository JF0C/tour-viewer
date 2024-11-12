import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { CommentListItem } from "./CommentListItem";
import { CreateCommentInput } from "./CreateCommentInput";

export type BlogPostCommentsProps = {
    blogPost: BlogPostDto
}

export const BlogPostComments: FunctionComponent<BlogPostCommentsProps> = (props) => {
    return <div className="flex flex-col gap-4 pt-4">
        {props.blogPost.comments?.map(c => <CommentListItem blogPostId={props.blogPost.id} comment={c} /> )}
        <CreateCommentInput blogPostId={props.blogPost.id} />
    </div>
}