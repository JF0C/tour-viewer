import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadLoggedInUser } from "../../store/userThunk";
import { Login } from "../authentication/Login";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TourMap } from "../tourView/TourMap";


export const StartPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const authState = useAppSelector((state) => state.auth);

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (authState.loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Login />
    }

    return <div className="h-full">
        <TourMap />
    </div>
}