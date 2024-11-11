import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { removeEditingTourParticipant, showInfobar } from "../../store/tourStateReducer";
import { UserReferenceDto } from "../../dtos/userReferenceDto";
import { setUserDetail } from "../../store/userStateReducer";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { setSelectedBlogpost } from "../../store/blogPostStateReducer";

export type ParticipantProps = {
    user: UserReferenceDto;
    canRemove: boolean;
    linkToProfile?: boolean;
}

export const Participant: FunctionComponent<ParticipantProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const removeParticipant = () => {
        dispatch(removeEditingTourParticipant(props.user.id))
    }

    const openProfile = () => {
        dispatch(setUserDetail(props.user));
        dispatch(setSelectedBlogpost());
        dispatch(showInfobar(false));
        navigate(Paths.UserProfilePage);
    }

    return <div className={`flex flex-row border rounded-full ps-2 items-center ${props.canRemove?'':'pe-2'}`}>
        {
            props.linkToProfile ? 
            <Button sx={{ minWidth: 0, minHeight: 0, margin: 0, padding: 0 }} onClick={openProfile}>{props.user.username}</Button>
            : <div>{props.user.username}</div>
        }
        {
            props.canRemove ? 
            <Button sx={{ minWidth: 0, minHeight: 0 }} onClick={removeParticipant}>
                <FontAwesomeIcon icon={faX}/>
            </Button>
            :<></>
        }
    </div>
}