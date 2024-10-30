import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadLoggedInUser } from "../../store/userThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TourMap } from "../tourView/TourMap";


export const StartPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (authState.loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        navigate(Paths.LoginPage);
    }

    return <div className="h-full">
        <TourMap />
    </div>
}