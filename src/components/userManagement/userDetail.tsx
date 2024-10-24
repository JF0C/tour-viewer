import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button, Input } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setUserForEditing } from "../../store/adminStateReducer";
import { UserRoleButton } from "./userRoleButton";

export const UserDetail: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector((state) => state.admin.userForEditing);
    const allRoles = useAppSelector((state) => state.admin.availableRoles) ?? [];

    if (selectedUser === undefined) {
        return <></>
    }
    const deSelectUser = () => {
        dispatch(setUserForEditing(undefined))
    }

    return <div className="flex-1">
        <div className="flex flex-row w-full p-4 items-center">
            <div className="flex-1 font-bold text-center">
                { selectedUser.username }
                &nbsp;
                { `(${selectedUser.id})` }
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
                        <Input type='text' placeholder='new email' />
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
            </tbody>
        </table>
    </div>
}