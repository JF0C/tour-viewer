import { FunctionComponent } from "react";
import { UserDetailDto } from "../../dtos/userDetailDto";
import { TourListItem } from "../tourView/TourListItem";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { clearTracks } from "../../store/trackStateReducer";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";

export type UserTourListProps = {
    user: UserDetailDto
}

export const UserTourList: FunctionComponent<UserTourListProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!props.user.tours) {
        return <div>{props.user.username} has no tours</div>
    }

    const tourSelected = () => {
        dispatch(setEditingBlogpost(undefined));
        dispatch(clearTracks());
        navigate(Paths.HomePage);
    }

    return <div>
        <div className="font-bold">
            Tours
        </div>
        {
            props.user.tours.items.map(t => <TourListItem tour={t} onSelected={tourSelected}/>)
        }
    </div>
}