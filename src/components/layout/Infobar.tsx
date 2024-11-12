import { SwipeableDrawer } from "@mui/material";
import { FunctionComponent } from "react";
import { showInfobar } from "../../store/tourStateReducer";
import { BlogPostDetails } from "../blogPost/BlogPostDetails";
import { BlogPostEditor } from "../blogPost/BlogPostEditor";
import { TourDataSwipeContainer } from "../tourView/TourDataSwipeContainer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedBlogpost } from "../../store/blogPostStateReducer";

export const Infobar: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const selectedBlogPost = useAppSelector((state) => state.blog.selectedBlogPost);
    const infoBarVisible = useAppSelector((state) => state.tour.showInfoBar) || isEditingBlogPost || Boolean(selectedBlogPost);
    const infoBarFull = useAppSelector((state) => state.tour.infoBarFull);

    const isMobile = window.innerWidth < 768;

    const closeInfobar = () => {
        dispatch(showInfobar(false));
        dispatch(setSelectedBlogpost());
    }

    return <SwipeableDrawer
        anchor={isMobile ? "bottom" : "right"}
        variant={(isMobile && !isEditingBlogPost) ? 'temporary': 'persistent'}
        className={`info-bar-drawer ${infoBarFull ? 'full' : ''}`}
        open={infoBarVisible}
        onClose={closeInfobar}
        onOpen={() => dispatch(showInfobar(true))}
    >
        <div className="h-full p-2 overflow-clip md:mt-12">
            {
                isEditingBlogPost ? <BlogPostEditor /> :
                    selectedBlogPost !== undefined ? <BlogPostDetails blogPost={selectedBlogPost} /> :
                        <TourDataSwipeContainer />
            }
        </div>
    </SwipeableDrawer>
}