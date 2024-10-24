import { Button, Menu, MenuItem } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeRoleAssignment, loadUsersAdmin } from "../../store/adminThunk";

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
    const pagination = useAppSelector((state) => state.admin.pagination);

    const toggleRoleAssignment = () => {
        dispatch(changeRoleAssignment({ role: props.role, userId: props.userId, action: assignmentAction }))
            .unwrap()
            .catch()
            .then(() => dispatch(loadUsersAdmin({
                page: pagination.page,
                count: pagination.itemsPerPage
            })));
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
