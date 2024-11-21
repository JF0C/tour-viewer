import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { komootLoginRequest } from "../../store/komootThunk";
import { useAppDispatch } from "../../store/store";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const KomootLogin: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = () => {
        dispatch(komootLoginRequest({
            email: email,
            password: password
        }));
    }
    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            login();
        }
    }

    return <SmallFormLayout buttons={<>
        <NavLink to={Paths.EditTourPage}>
            <Button>
                Back
            </Button>
        </NavLink>
        <Button onClick={login}>Login</Button>
    </>}>
        <div>Login to Komoot</div>
        <Input placeholder="email" onKeyUp={keyUp} onChange={e => setEmail(e.target.value)} type="text" />
        <Input placeholder="password" onKeyUp={keyUp} onChange={e => setPassword(e.target.value)} type="password" />
    </SmallFormLayout>
}