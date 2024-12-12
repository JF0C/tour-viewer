import { SwipeableDrawer } from "@mui/material";
import { FunctionComponent } from "react";
import { BlogPostDetails } from "../blogPost/BlogPostDetails";
import { BlogPostEditor } from "../blogPost/BlogPostEditor";
import { TourDataSwipeContainer } from "../tourView/TourDataSwipeContainer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedBlogpost } from "../../store/blogPostStateReducer";
import { setInfobarOpen } from "../../store/viewStateReducer";
import { TourPreviewPagination } from "../tourSearch/TourSearch";
import { BlogPostFilterControls } from "../blogPostSearch/BlogPostFilterControls";

export const Infobar: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const selectedBlogPost = useAppSelector((state) => state.blog.selectedBlogPost);
    const tourIsSelected = useAppSelector((state) => state.tour.selectedTour);
    const viewState = useAppSelector((state) => state.view);
    const infoBarVisible = viewState.infobarOpen || isEditingBlogPost || Boolean(selectedBlogPost);
    const infoBarLarge = viewState.infobarLarge;

    const isMobile = window.innerWidth < 768;

    const closeInfobar = () => {
        dispatch(setInfobarOpen(false));
        dispatch(setSelectedBlogpost());
    }

    return <SwipeableDrawer
        anchor={isMobile ? "bottom" : "right"}
        variant={(isMobile && !isEditingBlogPost) ? 'temporary': 'persistent'}
        className={`info-bar-drawer ${infoBarLarge ? 'full' : ''}`}
        open={infoBarVisible}
        onClose={closeInfobar}
        onOpen={() => dispatch(setInfobarOpen(true))}
    >
        <div className="flex flex-col h-full">
        <div className="full-screen-info-bar-placeholder flex-none"></div>
        <div className="flex-1 overflow-y-scroll">
            {
                isEditingBlogPost ? <BlogPostEditor /> :
                selectedBlogPost !== undefined ? <BlogPostDetails blogPost={selectedBlogPost} /> :
                viewState.mapMode === 'blogPosts' ? <BlogPostFilterControls /> :
                tourIsSelected ? <TourDataSwipeContainer /> :
                <TourPreviewPagination />
            }
        </div>

        </div>
    </SwipeableDrawer>
}