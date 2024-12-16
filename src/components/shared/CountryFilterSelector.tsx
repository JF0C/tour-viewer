import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadCountriesRequest } from "../../store/systemThunk";
import { Button, TextField } from "@mui/material";
import { LoadingSpinner } from "./LoadingSpinner";
import { CountrySelectorItem } from "./CountrySelectorItem";
import { CountryDto } from "../../dtos/shared/countryDto";
import { CountryLabel } from "./CountryLabel";

export type CountryFilterSelectorProps = {
    selectedCountries: number[];
    addCountry: (id: number) => void;
    removeCountry: (id: number) => void;
}

export const CountryFilterSelector: FunctionComponent<CountryFilterSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const systemState = useAppSelector((state) => state.system);
    const [countryInput, setCountryInput] = useState('');
    const countriesPerPage = 8;

    const showReloadButton = systemState.countries.length === 0
        && systemState.countriesLoaded;

    if (!systemState.loading && !systemState.countriesLoaded && systemState.countries.length === 0) {
        dispatch(loadCountriesRequest());
    }

    const filteredCountries = systemState.countries
        .filter(c => c.name.toLowerCase().includes(countryInput)
            || c.code.toLowerCase().includes(countryInput))
    
    const selectedCountries = filteredCountries.length > 10 ?
        filteredCountries.slice(0, 10) : 
        filteredCountries;

    const isSelected = (country: CountryDto): boolean => {
        return props.selectedCountries.find(c => c == country.id) !== undefined
    }

    const toggleCountry = (country: CountryDto) => {
        if (isSelected(country)) {
            props.removeCountry(country.id);
        }
        else {
            props.addCountry(country.id);
        }
    }

    return <div>
        <TextField label="Country" size="small" value={countryInput ?? 'All'} 
            onChange={e => setCountryInput(e.target.value)} />
        <div className="w-full overflow-x-scroll flex flex-row gap-2 pt-2">
            {
                props.selectedCountries.map(c => <CountryLabel countryId={c} />)
            }
        </div>
        {
            systemState.loading ? <LoadingSpinner /> :
            selectedCountries.map(c => <CountrySelectorItem
                country={c}
                selected={isSelected(c)}
                onClick={toggleCountry}/>)
        }
        <div className={showReloadButton ? '' : 'hidden'}>
            <Button onClick={() => dispatch(loadCountriesRequest())}>Reload Countries</Button>
        </div>
    </div>
}