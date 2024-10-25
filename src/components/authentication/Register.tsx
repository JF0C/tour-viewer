import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { registerRequest } from "../../store/userThunk";
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
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [validationMessage, setValidationMessage] = useState('')

    const navigate = useNavigate()

    const register = () => {
        if (username.length < 3) {
            setValidationMessage('Username must be at leas 3 characters long');
            return;
        }
        if (!email.includes('@')) {
            setValidationMessage('not a valid email');
            return;
        }
        if (password !== passwordRepeat) {
            setValidationMessage('passwords don\'t match');
            return;
        }
        if (password.length < 8) {
            setValidationMessage('password must have at least 8 characters');
            return;
        }

        dispatch(registerRequest({ username: username, email: email, password: password }))
            .then((e) => {
                navigate(`${Paths.ValiateCodePage}?email=${email}`)
            })
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return <SmallFormLayout buttons={<Button color='success' variant='outlined' onClick={register}>Register</Button>}>
        <div style={{color: 'red'}}>{validationMessage}</div>
        <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
        <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
        <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <Input onChange={(e) => setPasswordRepeat(e.target.value)} type="password" placeholder="Repeat" />
    </SmallFormLayout>
}