import { Button } from "@mui/material";
import { useState } from "react";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../../../store/store";
import { BlogPostLabel } from "../../blogPost/BlogPostLabel";
import { CountryFilterSelector } from "./CountryFilterSelector";
import { CountryLabel } from "./CountryLabel";
import { ModalBaseLayout } from "../ModalBaseLayout";
import { loadCountriesRequest } from "../../../store/systemThunk";

export type CountryFilterProps<T> = {
    stateSliceSelector: (state: RootState) => T
    countriesSelector: (state: RootState) => number[]
    setCountries: (dispatch: AppDispatch, stateSlice: T, countries: number[] | undefined) => void
}

export function CountryFilter<T>(props: CountryFilterProps<T>) {
    const dispatch = useAppDispatch();
    const slice = useAppSelector(props.stateSliceSelector);
    const countries = useAppSelector(props.countriesSelector);
    const [open, setOpen] = useState(false);
    const systemState = useAppSelector((state) => state.system);

    if (systemState.countries.length === 0 && !systemState.loading && !systemState.countriesLoaded) {
        dispatch(loadCountriesRequest());
    }

    const countryFromId = (id: number) => {
        return systemState.countries.find(c => c.id === id);
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
        setOpen(false);
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

    return <>
        <Button onClick={() => setOpen(true)}>
            {
                countries.length ? 
                <div className="flex flex-row gap-2">
                    {
                        countries.slice(0, 3)
                            .map(c => <CountryLabel label={countryFromId(c)?.code ?? c.toString()} />)
                    }
                    {
                        countries.length > 3 ?
                            <CountryLabel label={`+ ${countries.length - 3}`}/>
                            :<></>
                    }
                </div> :
                <>Countries</>
            }
        </Button>
        <ModalBaseLayout open={open} openChange={setOpen} bottomRow={
            <div className="w-full flex flex-row justify-between">
                <Button onClick={resetCountryFilter}>Reset</Button>
                <Button onClick={() => setOpen(false)}>Done</Button>
            </div>
        }>
            <CountryFilterSelector selectedCountries={countries}
                addCountry={addCountryToFilter} removeCountry={removeCountryFromFilter}
            />
        </ModalBaseLayout>
    </>
}