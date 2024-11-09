import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadUserDetail } from "../../store/stateHelpers";
import { ProfilePicture } from "./ProfilePicture";
import { UserTourList } from "./UserTourList";
import { BigFormLayout } from "../layout/BigFormLayout";
import { UserBlogPostList } from "./UserBlogPostList";

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

    return <BigFormLayout>
        <div className="flex flex-row justify-center">
            <ProfilePicture user={userState.selectedUser} size={300} />
        </div>
        <div className="flex flex-row flex-wrap w-full justify-between">
            <div className="w-full md:max-w-96">
                <UserTourList user={userState.selectedUser} />
            </div>
            <div className="w-full md:max-w-96">
                <UserBlogPostList user={userState.selectedUser} />
            </div>
        </div>
    </BigFormLayout>
}