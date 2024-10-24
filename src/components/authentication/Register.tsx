import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { registerRequest } from "../../store/loginThunk";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { SmallFormLayout } from "../layout/SmallFormLayout";


export const Register: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.auth.loading)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const register = () => {
        dispatch(registerRequest({ username: username, email: email, password: password }))
            .then((e) => {
                navigate(`${Paths.ValiateCodePage}?email=${email}`)
            })
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return <SmallFormLayout buttons={<Button color='success' variant='outlined' onClick={register}>Register</Button>}>
        <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
        <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
        <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
    </SmallFormLayout>
}