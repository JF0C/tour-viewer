import { FunctionComponent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = (props) => {
    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    if (authState.loading) {
        return <LoadingSpinner />
    }

    if (!authState.user) {
        navigate(Paths.LoginPage);
    }
    return <>{props.children}</>
};