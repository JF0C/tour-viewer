import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { Roles } from "../../constants/Rolenames";
import { loadAvailableRoles, loadUsersAdmin } from "../../store/adminThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetBoundsSet } from "../../store/trackStateReducer";
import { BigFormLayout } from "../layout/BigFormLayout";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { CleanupButton } from "./cleanupButton";
import { UserDetail } from "./userDetail";
import { UserList } from "./userList";
import { CountriesInUseButton } from "./countriesInUseButton";

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
            count: adminState.pagination.itemsPerPage
        }))
            .then(() => dispatch(loadAvailableRoles()));
    }
    if ((adminState.users === undefined || adminState.availableRoles === undefined) && !adminState.loading) {
        loadUsers();
    }

    const closeAdminPage = () => {
        dispatch(resetBoundsSet());
        navigate(Paths.HomePage);
    }

    return <BigFormLayout
        buttons={
            <>
                <Button onClick={loadUsers}>
                    Reload
                </Button>
                <Button onClick={closeAdminPage}>
                    Done
                </Button>
            </>
        }
    >
        <div className="flex flex-row flex-wrap gap-4">
            <UserList />
            <UserDetail />
        </div>
        <div>
            <div className="font-bold pt-4 border-bottom">
                Manually run Cron Jobs
            </div>
            <CleanupButton />
            <CountriesInUseButton />
        </div>
    </BigFormLayout>
}