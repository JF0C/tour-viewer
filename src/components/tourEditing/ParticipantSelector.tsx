import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchUsers } from "../../store/userThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { Checkbox, Pagination } from "@mui/material";
import { addEditingTourParticipant, removeEditingTourParticipant, setEditingTour } from "../../store/tourStateReducer";
import { UserReferenceDto } from "../../dtos/userReferenceDto";
import { addParticipantRequest, loadTourRequest, removeParticipantRequest } from "../../store/tourThunk";

export const ParticipantSelector: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.auth);
    const selectedUsers = useAppSelector((state) => state.tour.editingTour.participants);
    const tourId = useAppSelector((state) => state.tour.editingTour.id);

    const toggleSelectedUser = (user: UserReferenceDto) => {
        if (tourId === 0) {
            if (selectedUsers.find(u => u.id === user.id)) {
                dispatch(removeEditingTourParticipant(user.id));
            }
            else {
                dispatch(addEditingTourParticipant(user));
            }
        }
        else {
            if (selectedUsers.find(u => u.id === user.id)) {
                dispatch(removeParticipantRequest({
                    tourId: tourId,
                    participantId: user.id
                }))
                .unwrap()
                .then(() => dispatch(loadTourRequest(tourId))
                    .unwrap()
                    .then((tour) => dispatch(setEditingTour(tour))));
            }
            else {
                dispatch(addParticipantRequest({
                    tourId: tourId,
                    participantId: user.id
                }))
                .unwrap()
                .then(() => dispatch(loadTourRequest(tourId))
                    .unwrap()
                    .then((tour) => dispatch(setEditingTour(tour))));
            }
        }
    }
    const changePage = (page: number) => {
        dispatch(searchUsers({page: page, count: userState.userPagination.itemsPerPage}))
    }
    
    if (userState.users.length === 0 && !userState.loading) {
        dispatch(searchUsers({page: userState.userPagination.page, count: userState.userPagination.itemsPerPage}))
    }
    if (userState.loading) {
        return <LoadingSpinner/>
    }
    return <div className="w-56">
        {
            userState.users.map(u =>
                <div key={u.id} className="flex flex-row items-center w-full" onClick={() => toggleSelectedUser(u)}>
                    <div className="flex-1">
                        { u.username }
                    </div>
                    <div>
                        <Checkbox checked={Boolean(selectedUsers.find(s => s.id === u.id))}/>
                    </div>
                </div>
            )
        }
        <Pagination count={userState.userPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)}  />
    </div>
}