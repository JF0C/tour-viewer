import { faCog, faSignIn, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuItem } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { logoutRequest } from "../../store/authThunk";
import { resetKomootUser } from "../../store/komootStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserDetail } from "../../store/userStateReducer";
import { ProfilePicture } from "./ProfilePicture";

export const UserIcon: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);

    const buttonRef = useRef<any>();

    const logout = () => {
        setMenuOpen(false);
        dispatch(resetKomootUser());
        dispatch(logoutRequest())
            .unwrap()
            .catch()
            .then(() => navigate(Paths.LoginPage));
    }

    if (!user) {
        return <NavLink to={Paths.LoginPage}>
            <Button>
                <FontAwesomeIcon icon={faSignIn} />
            </Button>
        </NavLink>
    }

    const loadUserProfile = () => {
        setMenuOpen(false);
        dispatch(setUserDetail(user));
        navigate(Paths.UserProfilePage);
    }

    const openUserSettings = () => {
        navigate(Paths.UserSettingsPage);
        setMenuOpen(false);
    }

    return <>
        <Button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)}>
            {
                user.profilePictureId ?
                    <ProfilePicture user={user} size={40} />
                    : user.username
            }
        </Button>
        <Menu sx={{ zIndex: 6000 }} anchorEl={buttonRef.current} open={menuOpen} onClose={() => setMenuOpen(false)}>
            <MenuItem onClick={loadUserProfile}>
                <Button>
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;Profile
                </Button>
            </MenuItem>
            <MenuItem onClick={openUserSettings}>
                <Button>
                    <FontAwesomeIcon icon={faCog} />
                    &nbsp;Settings
                </Button>
            </MenuItem>
            <MenuItem onClick={logout}>
                <Button>
                    <FontAwesomeIcon icon={faSignOut} />
                    &nbsp;Logout
                </Button>
            </MenuItem>
        </Menu>
    </>
}