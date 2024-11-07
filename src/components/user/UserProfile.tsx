import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadUserDetail } from "../../store/stateHelpers";

export const UserProfile: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);

    if (userState.loading) {
        return <LoadingSpinner />
    }

    if (!userState.selectedUser) {
        return <></>
    }

    if (!userState.selectedUser.tours || !userState.selectedUser.blogPosts) {
        loadUserDetail(dispatch, userState.selectedUser);
    }

    return <div>
        {
            JSON.stringify(userState.selectedUser)
        }
    </div>
}