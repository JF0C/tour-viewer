import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { loginRequest, logoutRequest } from "../../store/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { SmallFormLayout } from "../layout/SmallFormLayout";

export const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector((state) => state.auth.loading);
    const loggedIn = useAppSelector((state) => Boolean(state.auth.user));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        dispatch(loginRequest({
            email: email,
            password: password
        }))
            .unwrap()
            .catch()
            .then(() => navigate(Paths.HomePage))
    }
    const logout = () => {
        dispatch(logoutRequest());
    }
    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            login();
        }
    }

    return <div>{
        loading ?
            <LoadingSpinner />
            :
            <SmallFormLayout buttons={
                loggedIn ? <Button variant='outlined' color='warning' onClick={logout}>Logout</Button> :
                    <>
                        <Button variant='outlined' color='success' onClick={login}>
                            Login
                        </Button>
                        <NavLink to={Paths.RegisterPage}>
                            <Button className="w-full" variant='outlined' color='primary'>
                                Register
                            </Button>
                        </NavLink>
                        <NavLink to={Paths.RequestCodePage}>
                            <Button className="w-full" variant='outlined' color='primary'>
                                Send Code
                            </Button>
                        </NavLink>
                    </>
            }>
                {
                    loggedIn ? <></> :
                        <>
                            <Input placeholder="email" onKeyUp={keyUp} onChange={e => setEmail(e.target.value)} type="text" />
                            <Input placeholder="password" onKeyUp={keyUp} onChange={e => setPassword(e.target.value)} type="password" />
                        </>
                }
            </SmallFormLayout>
    }
    </div>
}