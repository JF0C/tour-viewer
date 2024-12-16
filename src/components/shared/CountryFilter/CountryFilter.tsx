import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../../../store/store";
import { loadCountriesRequest } from "../../../store/systemThunk";
import { CountrySelector } from "./CountrySelector";

export type CountryFilterProps<T> = {
    stateSliceSelector: (state: RootState) => T
    countriesSelector: (state: RootState) => number[]
    setCountries: (dispatch: AppDispatch, stateSlice: T, countries: number[] | undefined) => void
}

export function CountryFilter<T>(props: CountryFilterProps<T>) {
    const dispatch = useAppDispatch();
    const slice = useAppSelector(props.stateSliceSelector);
    const countries = useAppSelector(props.countriesSelector);
    const systemState = useAppSelector((state) => state.system);

    if (systemState.countries.length === 0 && !systemState.loading && !systemState.countriesLoaded) {
        dispatch(loadCountriesRequest());
    }

    const addCountryToFilter = (id: number) => {
        const newCountries = [...countries];
        if (newCountries.includes(id)) {
            return;
        }
        countries.push(id)
        props.setCountries(dispatch, slice, countries);
    }

    const resetCountryFilter = () => {
        props.setCountries(dispatch, slice, undefined);
    }

    const removeCountryFromFilter = (id: number) => {
        const newCountries: number[] = [];
        countries.forEach(c => {
            if (c !== id) {
                newCountries.push(c);
            }
        });
        props.setCountries(dispatch, slice, newCountries.length === 0 ? undefined : newCountries);
    }

    return <CountrySelector selectedCountries={countries}
        addCountry={addCountryToFilter} removeCountry={removeCountryFromFilter}
        resetCountries={resetCountryFilter} />
}