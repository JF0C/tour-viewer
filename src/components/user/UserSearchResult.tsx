import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { Button } from "@mui/material";
import { UserReferenceDto } from "../../dtos/user/userReferenceDto";

export type UserSearchResultProps = {
    onUserSelected: (user: UserReferenceDto) => void
}

export const UserSearchResult: FunctionComponent<UserSearchResultProps> = (props) => {
    const userState = useAppSelector((state) => state.user);

    return <div className="w-full">
        {userState.users?.map(u =>
            <div className="w-full">
                <Button onClick={() => props.onUserSelected(u)}>
                    {u.username}
                </Button>
            </div>)}
    </div>
}