import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { OverallLoadingSpinner } from "../shared/OverallLoadingSpinner";
import { searchBlogPostRequest } from "../../store/blogPostThunk";
import { BlogPostResultMarker } from "./BlogPostResultMarker";

export const BlogPostView: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);

    useEffect(() => {
        console.log('loading blog posts');
        dispatch(searchBlogPostRequest({
            ...blogPostState.filter,
            page: blogPostState.pagination.page,
            count: blogPostState.pagination.itemsPerPage
        }));
    }, [blogPostState.pagination.page, blogPostState.pagination.itemsPerPage, blogPostState.filter])

    if (blogPostState.loading) {
        return <OverallLoadingSpinner />
    }

    return <>
        {
            blogPostState.blogPosts.map(b => <BlogPostResultMarker key={b.id} blogPost={b}/>)
        }
    </>
}