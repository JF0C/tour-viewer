import { Button, Modal, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { UserReferenceDto } from "../../dtos/user/userReferenceDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTourSearchFilter } from "../../store/tourStateReducer";
import { UserSearch } from "../user/UserSearch";
import { UserSearchResult } from "../user/UserSearchResult";

export const ParticipantSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const searchFilter = tourState.tourSearchFilter;
    const [open, setOpen] = useState(false);

    const userSelected = (user: UserReferenceDto) => {
        setOpen(false);
        if (user.id === searchFilter.participantId) {
            return;
        }
        dispatch(setTourSearchFilter({
            ...searchFilter,
            participantName: user.username,
            participantId: user.id
        }));
    }

    const onBackgroundClick = (e: any) => {
        if (e.target.id === 'modal-background') {
            setOpen(false);
        }
    }

    return <>
        <TextField sx={{ width: '100px' }} label="Participant" size="small" className="athlete-select-field"
            value={searchFilter.participantName ?? 'All'} onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)}>
            <div id="modal-background" onClick={onBackgroundClick} className="flex flex-col items-center justify-center h-full">
                <div className="base-modal flex flex-col justify-center border border-solid rounded-lg text-white p-4">
                    <div className="flex flex-row flex-wrap max-w-80">
                        <UserSearch>
                            <UserSearchResult onUserSelected={userSelected} />
                        </UserSearch>
                    </div>
                    <div className="flex flex-row justify-between">
                        <Button onClick={() => userSelected({username: undefined!, id: undefined!})}>All</Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    </>
}