import { FunctionComponent, useState } from "react";
import { ValidatingInput } from "../shared/ValidatingInput";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Roles } from "../../constants/Rolenames";
import { setEditingTourName, setEditingTourStartDate } from "../../store/tourStateReducer";
import { Button } from "@mui/material";
import { TourParticipants } from "./TourParticipants";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { createTourRequest } from "../../store/tourThunk";

export const CreateTour: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const tour = useAppSelector((state) => state.tour.editingTour);
    const [nameValid, setNameValid] = useState(false);

    if (!user?.roles.includes(Roles.Contributor)) {
        return <div>Unauthorized</div>
    }

    const validateStartDate = (ticks: number) => {
        const date = ticks;
        const fromDate = new Date().valueOf() - 1000*60*60*24*365*10;
        const toDate = new Date().valueOf() + 1000*60*60*24*365;
        return fromDate < date && date < toDate
    }
    const startDateValid = validateStartDate(tour.startDate)

    const saveTour = () => {
        const date = new Date(tour.startDate);
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        dispatch(createTourRequest({
            name: tour.name,
            startDate: utcDate,
            participantIds: tour.participants.map(p => p.id)
        }));
    }

    return <SmallFormLayout buttons={<Button onClick={saveTour} disabled={!nameValid || !startDateValid}>Save</Button>}>
        <ValidatingInput name="Name" minLength={3} maxLength={100} 
            onChange={n => dispatch(setEditingTourName(n))} inputType="text" 
            validCallback={v => setNameValid(v)}/>
        <DatePicker format="DD.MM.YYYY" onChange={e => {dispatch(setEditingTourStartDate(e?.toDate().valueOf() ?? 0))} } />
        <div className="text-xs" style={{color: 'red'}}>{startDateValid ? '' : 'Date must be bigger than 10 years ago and smaller than 1 year in the future'}</div>
        <TourParticipants />
    </SmallFormLayout>
}