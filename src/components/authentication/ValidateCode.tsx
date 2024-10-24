import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Input } from "@mui/material";
import { validateCodeRequest } from "../../store/loginThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { SmallFormLayout } from "../layout/SmallFormLayout";


export const ValidateCode: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const loading = useAppSelector((state) => state.auth.loading)
    const user = useAppSelector((state) => state.auth.user)
    const [code, setCode] = useState('')
    const [mail, setMail] = useState('')
    const [mailByParam, setMailByParam] = useState(false)

    const validate = (email: string, code: string) => {
        dispatch(validateCodeRequest({email: email, code: code}))
            .unwrap()
            .catch(() => {})
            .then(() => {
                navigate(Paths.HomePage)
            })
    }

    if (user) {
        navigate(Paths.HomePage)
    }

    if (mail === '') {
        const mailParam = searchParams.get('email')
        if (mailParam) {
            setMail(mailParam)
            setMailByParam(true)
        }

        const codeParam = searchParams.get('code')
        if (codeParam && mailParam && !loading) {
            validate(mailParam, codeParam)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return <SmallFormLayout buttons={
        <Button variant='outlined' color='success' onClick={() => validate(mail, code)}>Validate</Button>
        }>
        {
            !mailByParam ?
            <Input onChange={(e) => setMail(e.target.value)} type="text" placeholder="Mail" />
            : <></>
        }
        <Input onChange={(e) => setCode(e.target.value)} type="text" placeholder="Code" />
    </SmallFormLayout>
}