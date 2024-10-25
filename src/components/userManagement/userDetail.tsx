import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Input } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setUserForEditing } from "../../store/adminStateReducer";
import { UserRoleButton } from "./userRoleButton";
import { ConfirmModal } from "../shared/ConfirmModal";
import { deleteUser } from "../../store/adminThunk";

export const UserDetail: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector((state) => state.admin.userForEditing);
    const allRoles = useAppSelector((state) => state.admin.availableRoles) ?? [];

    console.log(allRoles)

    if (selectedUser === undefined) {
        return <></>
    }
    const deSelectUser = () => {
        dispatch(setUserForEditing(undefined))
    }
    const deleteSelectedUser = () => {
        dispatch(deleteUser(selectedUser.id));
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
                        <Input type='text' placeholder='new username' />
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