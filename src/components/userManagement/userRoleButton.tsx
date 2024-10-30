import { Button, Menu, MenuItem } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { changeRoleAssignment } from "../../store/adminThunk";
import { useAppDispatch } from "../../store/store";

export type UserRoleButtonProps = {
    role: string;
    isAssigned: boolean;
    userId: number;
}

export const UserRoleButton: FunctionComponent<UserRoleButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<any>();
    const [openMenu, setOpenMenu] = useState(false);
    const assignmentAction = props.isAssigned ? 'unassign' : 'assign';

    const toggleRoleAssignment = () => {
        dispatch(changeRoleAssignment({
            role: props.role,
            userId: props.userId,
            action: assignmentAction
        }));
    }

    return <>
        <Button onClick={() => setOpenMenu(!openMenu)} ref={buttonRef}>{props.role}</Button>
        <Menu anchorEl={buttonRef.current} open={openMenu} onClose={() => setOpenMenu(false)}>
            <MenuItem>
                <Button onClick={toggleRoleAssignment}>
                    { assignmentAction }
                </Button>
            </MenuItem>
        </Menu>
    </>
}
