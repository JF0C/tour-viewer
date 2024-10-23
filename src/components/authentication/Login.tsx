import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { loginRequest, logoutRequest } from "../../store/loginThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const Login: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.auth.loading);
    const loggedIn = useAppSelector((state) => Boolean(state.auth.user));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        dispatch(loginRequest({
            email: email,
            password: password
        }))
    }
    const logout = () => {
        dispatch(logoutRequest());
    }

    return <div className="p-12">{
        loading ?
            <div>loading</div>
            :
            loggedIn ?
                <Button onClick={logout}>Logout</Button>
                :
                <div className="flex flex-col">
                    <Input placeholder="email" onChange={e => setEmail(e.target.value)} type="text" />
                    <Input placeholder="password" onChange={e => setPassword(e.target.value)} type="password" />
                    <Button onClick={login}>Login</Button>
                    <Button><NavLink to={Paths.RegisterPage}>Register</NavLink></Button>
                </div>
    }
    </div>
}