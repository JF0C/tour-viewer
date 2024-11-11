import { FunctionComponent } from "react";
import { UserList } from "./userList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { UserDetail } from "./userDetail";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadAvailableRoles, loadUsersAdmin } from "../../store/adminThunk";
import { Button } from "@mui/material";
import { Roles } from "../../constants/Rolenames";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { resetBoundsSet } from "../../store/trackStateReducer";

export const AdminPage: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const adminState = useAppSelector((state) => state.admin);

    if (!user?.roles.includes(Roles.Admin)) {
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

    const closeAdminPage = () => {
        dispatch(resetBoundsSet());
        navigate(Paths.HomePage);
    }

    return <div className="flex flex-col w-full p-4">

        <div className="flex flex-row flex-wrap gap-4">
            <UserList />
            <UserDetail />
        </div>
        <div>
            <Button onClick={closeAdminPage}>
                Done
            </Button>
            <Button onClick={loadUsers}>
                Reload
            </Button>
        </div>
    </div>
}