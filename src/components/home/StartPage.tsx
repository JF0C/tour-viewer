import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppSelector } from "../../store/store";
import { Login } from "../authentication/Login";


export const StartPage: FunctionComponent = () => {
    const user = useAppSelector((state) => state.auth.user);

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
        </div>
    }
    </div>
}