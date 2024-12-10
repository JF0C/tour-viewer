import { SwipeableDrawer } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setInfobarOpen, setMenubarOpen } from "../../store/viewState";
import { Navbar } from "../navigation/Navbar";
import { setEditingBlogpost, setSelectedBlogpost } from "../../store/blogPostStateReducer";

export const Menubar: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const viewState = useAppSelector((state) => state.view);

    const setInfobarState = (open: boolean) => {
        dispatch(setMenubarOpen(open));
    }

    const closeInfobar = () => {
        dispatch(setInfobarOpen(false));
        dispatch(setEditingBlogpost(undefined));
        dispatch(setSelectedBlogpost(undefined));
    }

    return <SwipeableDrawer
        anchor="left"
        open={viewState.menubarOpen}
        onClose={() => setInfobarState(false)}
        onOpen={() => setInfobarState(true)}
    >
        <div id="sidebar-content" className="w-44 h-full">
            <Navbar closeSidebar={() => {
                setInfobarState(false);
                closeInfobar();
            }} />
        </div>
    </SwipeableDrawer>
}