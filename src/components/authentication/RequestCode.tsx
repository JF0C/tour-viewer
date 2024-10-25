import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { Button, Input } from "@mui/material";
import { accessCodeRequest } from "../../store/authThunk";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const RequestCode: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('');

    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            requestCode()
        }
    }

    const requestCode = () => {
        dispatch(accessCodeRequest(email))
            .unwrap()
            .catch()
            .then(() => navigate(`${Paths.ValiateCodePage}?email=${email}`))
    }
    
    return authState.loading ? <LoadingSpinner /> :
        <SmallFormLayout buttons={<Button variant='outlined' color='success' onClick={requestCode}>Request Code</Button>}>
            <Input type='text' onKeyUp={keyUp} onChange={e => setEmail(e.target.value)}/>
        </SmallFormLayout>
}