import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Login } from "../authentication/Login";
import { logoutRequest } from "../../store/authThunk";
import { loadLoggedInUser } from "../../store/userThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { showInfobar } from "../../store/tourStateReducer";


export const StartPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const authState = useAppSelector((state) => state.auth);
    const infoBarVisible = useAppSelector((state) => state.tour.showInfoBar);

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (authState.loading) {
        return <LoadingSpinner />
    }

    return <div>
    {
        user === undefined ? <Login />
        :
        <div>
        <NavLink to={Paths.AdminPage}>
            <Button>
                Admin
            </Button>
        </NavLink>
        <NavLink to={Paths.ToursPage}>
            <Button>
                Tours
            </Button>
        </NavLink>
        <Button onClick={() => dispatch(logoutRequest())}>Logout</Button>
        <Button onClick={() => dispatch(showInfobar(!infoBarVisible))}>Toggle Info Bar</Button>
        <NavLink to={Paths.CreateTourPage}>
            <Button>
                Create Tour
            </Button>
        </NavLink>
        </div>
    }
    </div>
}