import { FunctionComponent } from "react";
import { UserDetailDto } from "../../dtos/userDetailDto";
import { BlogPostListItem } from "../blogPost/BlogPostListItem";

export type UserBlogPostListProps = {
    user: UserDetailDto
}

export const UserBlogPostList: FunctionComponent<UserBlogPostListProps> = (props) => {

    if (!props.user.blogPosts) {
        return <div>
            {props.user.username} has no Blogposts
        </div>
    }

    return  <div>
        <div className="font-bold">
            Blogposts
        </div>
        {
            props.user.blogPosts.items.map(b => <BlogPostListItem blogPost={b}/>)
        }
    </div>
}