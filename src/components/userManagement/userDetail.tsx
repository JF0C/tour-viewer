import { faCheckCircle, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { setUserForEditing } from "../../store/adminStateReducer";
import { changeUsernameAdmin, deleteUser, validateUserAdmin } from "../../store/adminThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ConfirmModal } from "../shared/ConfirmModal";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { UserRoleButton } from "./userRoleButton";

export const UserDetail: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const adminState = useAppSelector((state) => state.admin);
    const selectedUser = adminState.userForEditing;
    const allRoles = adminState.availableRoles ?? [];

    if (selectedUser === undefined) {
        return <></>
    }
    const deSelectUser = () => {
        dispatch(setUserForEditing(undefined))
    }
    const deleteSelectedUser = () => {
        dispatch(deleteUser(selectedUser.id));
    }
    const changeUsername = (username: string) => {
        dispatch(changeUsernameAdmin({id: selectedUser.id, username: username}));
    }
    const validateUser = () => {
        dispatch(validateUserAdmin(selectedUser.id));
    }

    return <div className="flex-1">
        <div className="flex flex-row w-full p-4 items-center">
            <div className="flex-1 font-bold text-center">
                { selectedUser.username }
            </div>
            <div>
                <Button onClick={deSelectUser}>
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>
        </div>
        <table>
            <tbody>
                <tr>
                    <td>
                        Id
                    </td>
                    <td>
                        { selectedUser.id }
                    </td>
                </tr>
                <tr>
                    <td>
                        Username
                    </td>
                    <td>
                        <EditableNameLabel value={selectedUser.username} name='Username'
                            inputType="text" onApply={changeUsername}
                            minLength={3} maxLength={20} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Email
                    </td>
                    <td>
                        { selectedUser.email }
                    </td>
                </tr>
                <tr>
                    <td>
                        Assigned Roles
                    </td>
                    <td>
                        { allRoles.filter(r => selectedUser.roles.includes(r))
                            .map(r => <UserRoleButton key={r} userId={selectedUser.id} role={r} isAssigned={true} />) }
                    </td>
                </tr>
                <tr>
                    <td>
                        Available Roles
                    </td>
                    <td>
                        { allRoles.filter(r => !selectedUser.roles.includes(r))
                            .map(r => <UserRoleButton key={r} userId={selectedUser.id} role={r} isAssigned={false} />) }
                    </td>
                </tr>
                <tr>
                    <td>
                        Validated
                    </td>
                    <td>
                        {
                            selectedUser.validated ? <FontAwesomeIcon icon={faCheckCircle} />
                            : <>
                                <FontAwesomeIcon icon={faXmarkCircle} />
                                <Button onClick={validateUser}>
                                    Validate
                                </Button>
                            </>
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        Created
                    </td>
                    <td>
                        { selectedUser.created.toString() }
                    </td>
                </tr>
                <tr>
                    <td>
                        Modified
                    </td>
                    <td>
                        { selectedUser.modified?.toString() }
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <ConfirmModal onConfirm={deleteSelectedUser} buttonContent={<>Delete</>} type='error' 
                message={`Are you sure that you want to delete user ${selectedUser.username}?`} />
        </div>
    </div>
}