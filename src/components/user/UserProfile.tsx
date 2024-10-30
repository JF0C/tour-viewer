import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";

export const UserProfile: FunctionComponent = () => {

    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    if (!user) {
        navigate(Paths.LoginPage);
        return <></>
    }


    return <div>
        { user.username }
    </div>
}