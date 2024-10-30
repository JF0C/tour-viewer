import { FunctionComponent, useState } from "react"
import { SmallFormLayout } from "../layout/SmallFormLayout"
import { ValidatingInput } from "../shared/ValidatingInput"
import { Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch } from "../../store/store"
import { resetPasswordRequest } from "../../store/authThunk"
import { useSearchParams } from "react-router-dom"


export const ResetPassword: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [code, setCode] = useState('');
    const [password1Valid, setPassword1Valid] = useState(false);
    const [password2Valid, setPassword2Valid] = useState(false);
    const [codeValid, setCodeValid] = useState(false);
    const [mailByParam, setMailByParam] = useState(false);
    const [codeByParam, setCodeByParam] = useState(false);


    const validateSamePassword = (input: string) => {
        if (input === newPassword1) {
            return null;
        }
        else {
            return 'passwords must match'
        }
    }

    if (email === '' && !mailByParam) {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
            setMailByParam(true);
        }
    }

    if (code === '' && !codeByParam) {
        const codeParam = searchParams.get('code');
        if (codeParam) {
            setCode(codeParam);
            setCodeByParam(true);
        }
    }

    const sendResetPasswordRequest = () => {
        dispatch(resetPasswordRequest({
            email: email,
            code: code,
            password: newPassword2
        }));
    }

    return <SmallFormLayout>
        {
            mailByParam ? <div>{email}</div> :
            <ValidatingInput inputType="text" name='Email' minLength={0} maxLength={100}
                onChange={setEmail} />
        }
        {
            codeByParam ? <div>{code}</div> :
            <ValidatingInput inputType="text" name='Code' minLength={6} maxLength={6}
                onChange={setCode} validCallback={setCodeValid}/>
        }
        <ValidatingInput inputType="password" name='New Password' minLength={8} maxLength={50} 
            onChange={setNewPassword1} validCallback={setPassword1Valid}/>
        <ValidatingInput customValidator={validateSamePassword} inputType="password" name='Repeat password'
            onChange={setNewPassword2} validCallback={setPassword2Valid} />
        <Button onClick={sendResetPasswordRequest} disabled={!password1Valid || !password2Valid || !codeValid}>
            <FontAwesomeIcon icon={faCheck}/>
            &nbsp;
            Submit
        </Button>
    </SmallFormLayout>
}