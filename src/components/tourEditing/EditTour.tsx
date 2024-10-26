import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { EditableDateLabel } from "../shared/EditableDateLabel";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { changeTourStartDateRequest, renameTourRequest } from "../../store/tourThunk";
import { setEditingTourName, setEditingTourStartDate } from "../../store/tourStateReducer";
import { ticksToUtcDate } from "../../converters/dateConverters";
import { TrackList } from "./TrackList";


export const EditTour: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);

    const changeTourName = (name: string) => {
        dispatch(renameTourRequest({tourId: tourState.editingTour.id, name: name}))
            .unwrap()
            .catch()
            .then(() => dispatch(setEditingTourName(name)))

    }
    const changeTourStartDate = (ticks: number) => {
        dispatch(changeTourStartDateRequest({
            tourId: tourState.editingTour.id,
            startDate: ticksToUtcDate(ticks)
        }))
            .unwrap()
            .catch()
            .then(() => dispatch(setEditingTourStartDate(ticks)))
    }

    if (tourState.loading) {
        return <LoadingSpinner />
    }

    return <SmallFormLayout>
        <EditableNameLabel value={tourState.editingTour.name} inputType="text" name="Name" 
            onApply={changeTourName} minLength={3} maxLength={100}/>
        <EditableDateLabel value={tourState.editingTour.startDate} onApply={changeTourStartDate} />
        <TrackList />
    </SmallFormLayout>
}

