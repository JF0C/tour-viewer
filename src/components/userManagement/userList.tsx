import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadUsersAdmin } from "../../store/adminThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserListItem } from "./userListItem";

export const UserList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const adminState = useAppSelector((state) => state.admin)

    const loadUsers = () => {
        dispatch(loadUsersAdmin({ page: adminState.page, count: adminState.count }));
    }

    if (adminState.users === undefined && !adminState.loading) {
        loadUsers();
    }
    if (adminState.users !== undefined) {
        const user = adminState;
    }

    return (adminState.loading || adminState.users === undefined) ? <LoadingSpinner /> :
        <div>
            { adminState.users.map(u => <UserListItem key={u.id} user={u}/>) }
        </div>
}