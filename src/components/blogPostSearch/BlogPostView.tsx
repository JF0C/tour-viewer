import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { OverallLoadingSpinner } from "../shared/OverallLoadingSpinner";

export const BlogPostView: FunctionComponent = () => {
    
    const blogPostState = useAppSelector((state) => state.blog);

    if (blogPostState.loading) {
        return <OverallLoadingSpinner />
    }

    return <>
    </>
}