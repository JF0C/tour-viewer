import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setMenubarOpen } from "../../store/viewStateReducer";
import { UserIcon } from "../user/UserIcon";

export const AppBarContent: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const menubarOpen = useAppSelector((state) => state.view.menubarOpen);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomepage = location.pathname === '/';
    const isLoggedIn = useAppSelector((state) => Boolean(state.auth.user));

    return <div className="flex flex-row justify-between items-center truncate">
        <div className='w-16'>
            {
                isLoggedIn ?
                (
                    isHomepage ?
                    <Button onClick={() => dispatch(setMenubarOpen(!menubarOpen))}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                    :
                    <Button onClick={() => navigate(Paths.HomePage)}>
                        <FontAwesomeIcon icon={faHome}/>
                    </Button>
                )
                :<></>
            }
        </div>
        <div className='p-2 text-2xl md:text-3xl truncate'>
            Tour Viewer
        </div>
        <div className='w-16 truncate'>
            <UserIcon />
        </div>

    </div>
}