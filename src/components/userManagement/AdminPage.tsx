import { FunctionComponent } from "react";
import { UserList } from "./userList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { UserDetail } from "./userDetail";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadAvailableRoles, loadUsersAdmin } from "../../store/adminThunk";
import { Button } from "@mui/material";

export const AdminPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const adminState = useAppSelector((state) => state.admin);

    if (!user?.roles.includes('admin')) {
        return <div>Unauthorized</div>
    }
    if (adminState.loading) {
        return <LoadingSpinner />
    }
    const loadUsers = () => {
        dispatch(loadUsersAdmin({ 
                page: adminState.pagination.page, 
                count: adminState.pagination.itemsPerPage }))
            .then(() => dispatch(loadAvailableRoles()));
    }
    if ((adminState.users === undefined || adminState.availableRoles === undefined) && !adminState.loading) {
        loadUsers();
    }

    return <div className="flex flex-col w-full">

        <div className="flex flex-row">
            <UserList />
            <UserDetail />
        </div>
        <div>

            <Button onClick={loadUsers}>Reload</Button>
        </div>
    </div>
}