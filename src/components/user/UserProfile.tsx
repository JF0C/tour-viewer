import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Paths } from "../../constants/Paths";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { ValidatingInput } from "../shared/ValidatingInput";
import { changePasswordRequest } from "../../store/authThunk";
import { Button } from "@mui/material";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { changeUsernameRequest, loadLoggedInUser } from "../../store/userThunk";

export const UserProfile: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const loading = useAppSelector((state) => state.auth.loading);
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [password1Valid, setPassword1Valid] = useState(false);
    const [password2Valid, setPassword2Valid] = useState(false);


    if (!user) {
        navigate(Paths.LoginPage);
        return <></>
    }

    if (loading) {
        return <LoadingSpinner />
    }

    const changeUsername = (username: string) => {
        dispatch(changeUsernameRequest(username))
            .unwrap()
            .then(() => dispatch(loadLoggedInUser()));
    }

    const changePassword = () => {
        dispatch(changePasswordRequest({
            oldPassword: oldPassword,
            newPassword: newPassword2
        })).unwrap()
            .then(() => {
                setNewPassword1('');
                setNewPassword2('');
                setOldPassword('');
            });
    }

    const validateSamePassword = (input: string) => {
        if (input === newPassword1) {
            return null;
        }
        else {
            return 'passwords must match'
        }
    }

    return <SmallFormLayout>
        <table>
            <tbody>
                <tr>
                    <td>
                        Username
                    </td>
                    <td>
                        <EditableNameLabel inputType="text" name='Username' value={user.username}
                            onApply={changeUsername} minLength={3} maxLength={20} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Change Password
                    </td>
                    <td>
                        <ValidatingInput inputType="password" name='Old Password' onChange={setOldPassword} />
                        <ValidatingInput inputType="password" name='New Password' onChange={setNewPassword1} 
                            minLength={8} maxLength={50} validCallback={setPassword1Valid}/>
                        <ValidatingInput customValidator={validateSamePassword} inputType="password" 
                            name='Repeat Password' onChange={setNewPassword2} validCallback={setPassword2Valid}/>
                        <Button disabled={!password1Valid || !password2Valid} onClick={changePassword}>
                            Save
                        </Button>
                    </td>
                </tr>
            </tbody>

        </table>
    </SmallFormLayout>
}