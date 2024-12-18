import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { Roles } from "../../constants/Rolenames";
import { millisToUtcDate } from "../../converters/dateConverters";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addCountryToEditingTour, removeCountryFromEditingTour, setEditingTour, setEditingTourName, setEditingTourStartDate } from "../../store/tourStateReducer";
import { createTourRequest, loadTourRequest } from "../../store/tourThunk";
import { resetBoundsSet } from "../../store/trackStateReducer";
import { SmallFormLayout } from "../layout/SmallFormLayout";
import { ValidatingDatePicker } from "../shared/ValidatingDatePicker";
import { ValidatingInput } from "../shared/ValidatingInput";
import { TourParticipants } from "./TourParticipants";
import { CountrySelector } from "../shared/CountryFilter/CountrySelector";
import { loadCountriesRequest } from "../../store/systemThunk";
import { CountryDto } from "../../dtos/shared/countryDto";

export const CreateTour: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const tour = useAppSelector((state) => state.tour.editingTour);
    const systemState = useAppSelector((state) => state.system)
    const [nameValid, setNameValid] = useState(false);
    const [dateValid, setDateValid] = useState(false);
    const [initialized, setInitialized] = useState(false);

    if (!user?.roles.includes(Roles.Contributor)) {
        return <div>Unauthorized</div>
    }

    if (systemState.countries.length === 0 && !systemState.loading && !systemState.countriesLoaded) {
        dispatch(loadCountriesRequest());
    }

    if (!initialized) {
        setInitialized(true)
        dispatch(setEditingTourStartDate(Date.now()))
    }

    const saveTour = () => {
        dispatch(createTourRequest({
            name: tour.name,
            startDate: millisToUtcDate(tour.startDate),
            participantIds: tour.participants.map(p => p.id)
        })).unwrap().then((tid) => {
            dispatch(loadTourRequest(tid))
                .unwrap()
                .then((tour) => dispatch(setEditingTour(tour))
                )
            navigate(Paths.EditTourPage)
        });
    }

    const countryFromId = (id: number): CountryDto => {
        return systemState.countries.find(c => c.id === id)!;
    }

    const addCountryToTour = (id: number) => {
        dispatch(addCountryToEditingTour(countryFromId(id)));
    }

    const removeCountryFromTour = (id: number) => {
        dispatch(removeCountryFromEditingTour(id));
    }

    return <SmallFormLayout buttons={
        <>
            <Button onClick={saveTour} disabled={!nameValid || !dateValid}>Save</Button>
            <Button onClick={() => { dispatch(resetBoundsSet()); navigate(-1); }} color='warning'>Cancel</Button>
        </>
    }>
        <ValidatingInput name="Name" minLength={3} maxLength={100}
            onChange={n => dispatch(setEditingTourName(n))} inputType="text"
            validCallback={v => setNameValid(v)} />
        <ValidatingDatePicker label="Start Date" value={tour.startDate} validCallback={v => setDateValid(v)}
            onChange={v => dispatch(setEditingTourStartDate(v))} />
        <CountrySelector selectedCountries={tour.countries.map(c => c.id)} 
            addCountry={addCountryToTour}
            removeCountry={removeCountryFromTour}
            onlyCountriesInUse={false} />
        <TourParticipants />
    </SmallFormLayout>
}