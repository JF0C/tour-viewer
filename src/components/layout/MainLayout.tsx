import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, SwipeableDrawer } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";
import { getSelectedTourId, loadTourRequest } from "../../store/tourThunk";
import { Navbar } from "../navigation/Navbar";
import { CustomizedSnackbar } from "../shared/CustomizedSnackbar";
import { TourSelectorBar } from "../tourView/DataSelectorBar";
import { UserIcon } from "../user/UserIcon";
import { Infobar } from "./Infobar";

export type MainLayoutProps = {
    children: ReactNode
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const dispatch = useAppDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isLoggedId = useAppSelector((state) => Boolean(state.auth.user));
    const tourState = useAppSelector((state) => state.tour);
    
    const location = useLocation();
    const dataSelectorBarState = tourState.dataSelectorBarState;

    if (location.pathname !== "/" && dataSelectorBarState !== 'hide') {
        dispatch(setDataBarState('hide'));
    }
    if (tourState.defaultTourId === undefined && !tourState.loading) {
        dispatch(getSelectedTourId())
            .unwrap()
            .then(tourId => {
                console.log('selected tour id: ' + tourId);
                dispatch(loadTourRequest(tourId));
            });
    }

    return <div className="h-full main-layout flex flex-col">
        <div className="h-10">
            <AppBar sx={{ backgroundColor: '#201f23', zIndex: 5000 }}>
                <CustomizedSnackbar />
                <div className="flex flex-row justify-between items-center truncate">
                    <div>
                        {
                            isLoggedId ?
                                <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <FontAwesomeIcon icon={faBars} />
                                </Button>
                                : <></>
                        }
                    </div>
                    <div className='p-2 text-2xl md:text-3xl truncate'>
                        Tour Viewer
                    </div>
                    <div>
                        <UserIcon />
                    </div>

                </div>
            </AppBar>
            <TourSelectorBar />
        </div>
        <div className="flex-1 flex flex-col md:flex-row flex-wrap h-full">
            <SwipeableDrawer
                anchor="left"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            >
                <div id="sidebar-content" className="w-44 h-full">
                    <div className="h-16 placeholder"></div>
                    <Navbar closeSidebar={() => setSidebarOpen(false)} />
                </div>
            </SwipeableDrawer>
            <div className="main-content flex-1 overflow-y-scroll h-full flex flex-col">
                {
                    location.pathname !== '/' ?
                        <div className="placeholder h-12"></div>
                        : <></>
                }
                {props.children}
            </div>
            <Infobar />
        </div>
    </div>
}