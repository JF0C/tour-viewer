import { FunctionComponent } from "react";
import { UserDetailDto } from "../../dtos/userDetailDto";
import { TourListItem } from "../tourView/TourListItem";

export type UserTourListProps = {
    user: UserDetailDto
}

export const UserTourList: FunctionComponent<UserTourListProps> = (props) => {

    if (!props.user.tours) {
        return <div>{props.user.username} has no tours</div>
    }

    return <div>
        {
            props.user.tours.items.map(t => <TourListItem tour={t} onSelected={() => {}}/>)
        }
    </div>
}