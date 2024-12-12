import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { setInfobarOpen } from "../../store/viewStateReducer";
import { AuthorSelector } from "./AuthorSelector";
import { DateRangePicker } from "./DateRangePicker";
import { BlogPostTitleFilter } from "./BlogPostTitleFilter";
import { TourFilter } from "./TourFilter";

export const BlogPostFilterControls: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);

    const close = () => {
        dispatch(setInfobarOpen(false));
    }

    return <div className="info-bar-content flex flex-col" >
        <div className="p-2 flex flex-row justify-between text-xl items-center bg-primary mb-2">
            <div className="font-bold flex-1">
                {blogPostState.blogPosts.length} of {blogPostState.pagination.totalItems} Posts
            </div>
            <div className="flex flex-row">
                <Button onClick={close} style={{ minWidth: '20px' }}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2 p-2">
            <BlogPostTitleFilter />
            <TourFilter />
            <AuthorSelector />
            <DateRangePicker />
        </div>
    </div>
}