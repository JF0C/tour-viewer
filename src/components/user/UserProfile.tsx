import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadUserDetail } from "../../store/stateHelpers";
import { ProfilePicture } from "./ProfilePicture";
import { UserTourList } from "./UserTourList";

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

    return <div className="h-full">
        <div className="flex flex-row justify-center">
            <ProfilePicture user={userState.selectedUser} size={300} />
        </div>
        <div className="flex flex-row flex-wrap">
            <div className="w-full md:w-50">
                <UserTourList user={userState.selectedUser}/>
            </div>
            <div className="w-full md:w-50">
                other half
            </div>
        </div>
    </div>
}