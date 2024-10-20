import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { loginRequest, logoutRequest } from "../store/loginThunk";
import { useAppDispatch, useAppSelector } from "../store/store";

export const LoginComponent: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.uistate.loading);
    const loggedIn = useAppSelector((state) => Boolean(state.uistate.user));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        dispatch(loginRequest(
            {
                email: email,
                password: password
            }))
    }
    const logout = () => {
        dispatch(logoutRequest());
    }

    return <div>{
        loading ?
            <div>loading</div>
            :
        loggedIn ?
            <Button onClick={logout}>Logout</Button>
            :
            <div>
                <Input onChange={e => setEmail(e.target.value)} type="text" />
                <Input onChange={e => setPassword(e.target.value)} type="password" />
                <Button onClick={login}>Login</Button>
            </div>
    }
    </div>
}