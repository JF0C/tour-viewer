import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { changePasswordRequest } from "../../store/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetBoundsSet } from "../../store/trackStateReducer";
import { changeUsernameRequest, deleteUserRequest } from "../../store/userThunk";
import { BigFormLayout } from "../layout/BigFormLayout";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ValidatingInput } from "../shared/ValidatingInput";
import { ProfilePictureEditor } from "./ProfilePictureEditor";

export const UserSettings: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const loading = useAppSelector((state) => state.auth.loading);
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [password1Valid, setPassword1Valid] = useState(false);
    const [password2Valid, setPassword2Valid] = useState(false);
    const [confirmDeletePassword, setConfirmDeletePassword] = useState('');

    if (!user) {
        navigate(Paths.LoginPage);
        return <></>
    }

    if (loading) {
        return <LoadingSpinner />
    }

    const deleteUser = () => {
        dispatch(deleteUserRequest(confirmDeletePassword))
            .unwrap()
            .then(() => {
                navigate(Paths.RegisterPage)
            });
    }

    const changeUsername = (username: string) => {
        dispatch(changeUsernameRequest(username));
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

    const close = () => {
        dispatch(resetBoundsSet());
        navigate(Paths.HomePage);
    }

    return <BigFormLayout
            buttons={
                <div className="w-full flex flex-row justify-center">
                    <Button onClick={close}>
                        Close
                    </Button>
                </div>
            }
        >
        <table>
            <tbody>
                <tr>
                    <td colSpan={2}>
                        <ProfilePictureEditor user={user} />
                    </td>
                </tr>
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
                <tr>
                    <td colSpan={2}>
                        <div className="w-full flex flex-row justify-center">
                            <BaseConfirmModal confirmType="error"
                                confirmText='Leave'
                                buttonContent={<>
                                    <FontAwesomeIcon icon={faX}/>&nbsp;
                                    Delete profile and leave
                                </>} onConfirm={deleteUser}>
                                <div>
                                    <div>Do you really want to delete your account and leave the platform?</div>
                                    <Input placeholder="password" type='password' sx={{color: 'white'}}
                                        onChange={(e) => setConfirmDeletePassword(e.target.value)} />
                                </div>
                            </BaseConfirmModal>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
    </BigFormLayout>
}