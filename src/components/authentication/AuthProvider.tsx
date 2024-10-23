import { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { loadLoggedInUser } from "../../store/loginThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = (props) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!authState.user && !authState.fetchUserAttempted && !authState.loading) {
        dispatch(loadLoggedInUser());
    }

    if (authState.loading) {
        return <LoadingSpinner />
    }

    if (!authState.user) {
        navigate("");
    }
    return <>{props.children}</>
};