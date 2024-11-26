import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TourMap } from "../tourView/TourMap";


export const StartPage: FunctionComponent = () => {
    const user = useAppSelector((state) => state.auth.user);
    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    if (authState.loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        navigate(Paths.LoginPage);
        return <></>
    }

    return <div className="h-full">
        <TourMap />
    </div>
}