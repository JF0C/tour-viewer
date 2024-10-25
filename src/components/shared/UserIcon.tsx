import { FunctionComponent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Button, Menu, MenuItem } from "@mui/material";
import { Paths } from "../../constants/Paths";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutRequest } from "../../store/authThunk";

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
            .then(() => navigate(Paths.HomePage))
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
        <Menu anchorEl={buttonRef.current} open={menuOpen} onClose={() => setMenuOpen(false)}>
            <MenuItem>
                <Button onClick={logout}>
                    <FontAwesomeIcon icon={faSignOut} />
                    &nbsp;Logout
                </Button>
            </MenuItem>
        </Menu>
    </>
}