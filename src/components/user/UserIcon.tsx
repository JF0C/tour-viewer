import { faSignIn, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuItem } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { logoutRequest } from "../../store/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const UserIcon: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);

    const buttonRef = useRef<any>();

    const logout = () => {
        setMenuOpen(false);
        dispatch(logoutRequest())
            .unwrap()
            .catch()
            .then(() => navigate(Paths.LoginPage))
    }

    if (!user) {
        return <NavLink to={Paths.LoginPage}>
            <Button>
                <FontAwesomeIcon icon={faSignIn} />
            </Button>
        </NavLink>
    }
    return <>
        <Button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)}>
            { user.username }
        </Button>
        <Menu sx={{ zIndex: 6000 }} anchorEl={buttonRef.current} open={menuOpen} onClose={() => setMenuOpen(false)}>
            <MenuItem>
                <Button onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} />
                    &nbsp;Logout
                </Button>
            </MenuItem>
            <MenuItem>
                <Button onClick={() => navigate(Paths.UserPage)}>
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;Profile
                </Button>
            </MenuItem>
        </Menu>
    </>
}