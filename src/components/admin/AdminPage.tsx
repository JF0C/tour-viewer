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
import { BigFormLayout } from "../layout/BigFormLayout";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { cleanupImagesAndTracks } from "../../store/systemThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { CleanupView } from "./cleanupView";

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

    const dryRunCleanup = () => {
        dispatch(cleanupImagesAndTracks(true));
    }

    const cleanup = () => {
        dispatch(cleanupImagesAndTracks(false));
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
        <BaseConfirmModal onOpen={dryRunCleanup} onConfirm={cleanup} confirmType='warning'
            confirmText={'Cleanup'}
            buttonContent={<Button><FontAwesomeIcon icon={faBroom} />&nbsp;Cleanup Images and Tracks</Button>}>
                <CleanupView />
        </BaseConfirmModal>
    </BigFormLayout>
}