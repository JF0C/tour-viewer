import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { blogPostsWithoutTimeRequest } from "../../store/systemThunk";
import { Button } from "@mui/material";

export const BlogPostsWithoutTime: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [blogPostIds, setBlogPostIds] = useState<number[] | undefined>();

    const loadBlogPostsWithoutCountry = () => {
        dispatch(blogPostsWithoutTimeRequest())
            .unwrap()
            .then(ids => setBlogPostIds(ids));
    }

    return <div>
        <div>
            Check if all blog posts have a tour time assigned
        </div>
        <div>
            {
                blogPostIds === undefined ?
                    <Button onClick={loadBlogPostsWithoutCountry}>Load Blogposts</Button>
                    : blogPostIds.length === 0 ?
                        'all blog posts have a tour time!'
                        :
                        blogPostIds.map(id => <div key={'blog-post-without-time-' + id}>{id}</div>)
            }
        </div>
    </div>
}