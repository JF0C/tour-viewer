import { FunctionComponent } from "react";
import { PaginationWithCount } from "../shared/PaginationWithCount";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBlogPostSearchPagination } from "../../store/blogPostStateReducer";

export const SearchPagination: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);

    return <div className="flex flex-col gap-2 items-center">
        <div>
            Showing {blogPostState.blogPosts.length} of {blogPostState.pagination.totalItems} Posts
        </div>
        <PaginationWithCount
            id='blogpost-search'
            pagination={blogPostState.pagination}
            onChange={p => dispatch(setBlogPostSearchPagination({ page: p.page, count: p.itemsPerPage }))}
        />
    </div>
}