import { AppBar } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useSelectedTourId } from "../../hooks/selectedTourHook";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedTourId } from "../../store/tourStateReducer";
import { setDataBarState } from "../../store/viewStateReducer";
import { loadTourRequest, searchTours } from "../../store/tourThunk";
import { loadLoggedInUser } from "../../store/userThunk";
import { CustomizedSnackbar } from "../shared/CustomizedSnackbar";
import { TourSelectorBar } from "../tourView/DataSelectorBar";
import { AppBarContent } from "./AppBarContent";
import { Infobar } from "./Infobar";
import { Menubar } from "./Menubar";
import { TourProgressbar } from "./TourProgressbar";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => Boolean(state.auth.user));
    const tourState = useAppSelector((state) => state.tour);
    const authState = useAppSelector((state) => state.auth);
    const dataSelectorBarState = useAppSelector((state) => state.view.dataSelectorBarState);
    const [selectedTourId, storeSelectedTourId] = useSelectedTourId();
    const location = useLocation();
    const isHomepage = location.pathname === '/';

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (!isHomepage && dataSelectorBarState !== 'hide') {
        dispatch(setDataBarState('hide'));
    }

    if (!tourState.selectedTourId && !tourState.loading && isLoggedIn && !tourState.toursLoaded) {
        dispatch(searchTours({
            page: tourState.tourPagination.page,
            count: tourState.tourPagination.itemsPerPage
        }));
    }

    if (!tourState.loading && isLoggedIn && tourState.selectedTourId && !tourState.selectedTour) {
        dispatch(loadTourRequest(tourState.selectedTourId));
    }

    if (tourState.selectedTourId === undefined && selectedTourId !== null) {
        dispatch(setSelectedTourId(selectedTourId));
    }

    if (tourState.selectedTourId !== undefined && selectedTourId !== tourState.selectedTourId) {
        storeSelectedTourId(tourState.selectedTourId);
    }

    return <div className="h-full main-layout flex flex-col">
        <AppBar sx={{ backgroundColor: '#201f23', zIndex: 5000 }}>
            <CustomizedSnackbar />
            <AppBarContent />
            <TourProgressbar />
        </AppBar>
        <TourSelectorBar />
        <div className="h-12 flex-none">
        </div>
        <div className="flex-1 flex flex-col md:flex-row flex-wrap overflow-y-scroll">
            <Menubar />
            <div className="main-content flex-1 overflow-y-scroll flex flex-col">
                {props.children}
            </div>
            <Infobar />
        </div>
    </div>
}