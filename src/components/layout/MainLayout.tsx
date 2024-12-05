import { AppBar, SwipeableDrawer } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useSelectedTourId } from "../../hooks/selectedTourHook";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";
import { loadTourRequest, searchTours } from "../../store/tourThunk";
import { loadLoggedInUser } from "../../store/userThunk";
import { Navbar } from "../navigation/Navbar";
import { CustomizedSnackbar } from "../shared/CustomizedSnackbar";
import { TourSelectorBar } from "../tourView/DataSelectorBar";
import { AppBarContent } from "./AppBarContent";
import { Infobar } from "./Infobar";
import { setMenubarOpen } from "../../store/viewState";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => Boolean(state.auth.user));
    const tourState = useAppSelector((state) => state.tour);
    const authState = useAppSelector((state) => state.auth);
    const viewState = useAppSelector((state) => state.view);
    const [selectedTourId, setSelectedTourId] = useSelectedTourId();
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const dataSelectorBarState = tourState.dataSelectorBarState;

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (!isHomepage && dataSelectorBarState !== 'hide') {
        dispatch(setDataBarState('hide'));
    }

    if (selectedTourId === null && !tourState.loading && isLoggedIn && !tourState.toursLoaded) {
        dispatch(searchTours({
            page: tourState.tourPagination.page,
            count: tourState.tourPagination.itemsPerPage
        }));
    }

    if (!tourState.selectedTourId && !tourState.loading && isLoggedIn && selectedTourId) {
        dispatch(loadTourRequest(selectedTourId));
    }

    if (tourState.selectedTourId && tourState.selectedTourId !== selectedTourId) {
        setSelectedTourId(tourState.selectedTourId);
    }

    const setInfobarOpen = (open: boolean) => {
        dispatch(setMenubarOpen(open));
    }

    return <div className="h-full main-layout flex flex-col">
        <AppBar sx={{ backgroundColor: '#201f23', zIndex: 5000 }}>
            <CustomizedSnackbar />
            <AppBarContent />
        </AppBar>
        <TourSelectorBar />
        <div className="h-12 flex-none">
        </div>
        <div className="flex-1 flex flex-col md:flex-row flex-wrap overflow-y-scroll">
            <SwipeableDrawer
                anchor="left"
                open={viewState.menubarOpen}
                onClose={() => setInfobarOpen(false)}
                onOpen={() => setInfobarOpen(true)}
            >
                <div id="sidebar-content" className="w-44 h-full">
                    <Navbar closeSidebar={() => setInfobarOpen(false)} />
                </div>
            </SwipeableDrawer>
            <div className="main-content flex-1 overflow-y-scroll flex flex-col">
                {props.children}
            </div>
            <Infobar />
        </div>
    </div>
}