import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TextField } from "@mui/material";
import { setTourSearchFilter } from "../../store/tourStateReducer";
import { useDebounce } from "use-debounce";

export const TourNameFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const [nameFilter, setNameFilter] = useState<string|undefined>();
    const [debouncedName] = useDebounce(nameFilter, 500);

    if (debouncedName !== tourState.tourSearchFilter.name) {
        console.log('setting tour name filter');
        dispatch(setTourSearchFilter({
            ...tourState.tourSearchFilter,
            name: debouncedName
        }));
    }

    return <TextField label='Tour Name' value={nameFilter} size='small'
        onChange={e => setNameFilter(e.target.value) } />
}