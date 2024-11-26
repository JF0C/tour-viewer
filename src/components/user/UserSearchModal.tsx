import { FunctionComponent, useState } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { useAppDispatch } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserSearch } from "./UserSearch";
import { UserSearchResult } from "./UserSearchResult";
import { UserReferenceDto } from "../../dtos/user/userReferenceDto";
import { setUserDetail } from "../../store/userStateReducer";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const UserSearchModal: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const loadUserProfile = (user: UserReferenceDto) => {
        setOpen(false);
        dispatch(setUserDetail(user));
        navigate(Paths.UserProfilePage);
    }

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
        open={open} onOpen={() => setOpen(true)} hideCancel
        confirmText='Cancel'
        buttonContent={<>
            <FontAwesomeIcon icon={faSearch}/>
            &nbsp;
            Search User
        </>}
    >
        <UserSearch>
            <UserSearchResult onUserSelected={loadUserProfile}/>
        </UserSearch>

    </BaseConfirmModal>
}