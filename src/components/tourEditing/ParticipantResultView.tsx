import { Checkbox } from "@mui/material";
import { UserReferenceDto } from "../../dtos/userReferenceDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FunctionComponent } from "react";
import { removeEditingTourParticipant, addEditingTourParticipant, setEditingTour } from "../../store/tourStateReducer";
import { removeParticipantRequest, loadTourRequest, addParticipantRequest } from "../../store/tourThunk";

export const ParticipantResultView: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);
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

    return <>
        {
            userState.users?.map(u =>
                <div key={u.id} className="flex flex-row items-center w-full" onClick={() => toggleSelectedUser(u)}>
                    <div className="flex-1">
                        {u.username}
                    </div>
                    <div>
                        <Checkbox checked={Boolean(selectedUsers.find(s => s.id === u.id))} />
                    </div>
                </div>)
        }
    </>

}