import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { loadCountriesRequest } from "../../../store/systemThunk";
import { Button, Pagination, TextField } from "@mui/material";
import { LoadingSpinner } from "../LoadingSpinner";
import { CountrySelectorItem } from "./CountrySelectorItem";
import { CountryDto } from "../../../dtos/shared/countryDto";
import { CountryLabel } from "./CountryLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export type CountryFilterSelectorProps = {
    selectedCountries: number[];
    addCountry: (id: number) => void;
    removeCountry: (id: number) => void;
}

export const CountryFilterSelector: FunctionComponent<CountryFilterSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const systemState = useAppSelector((state) => state.system);
    const [countryInput, setCountryInput] = useState('');
    const [page, setPage] = useState(0);
    const countriesPerPage = 8;

    const showReloadButton = systemState.countries.length === 0
        && systemState.countriesLoaded;

    if (!systemState.loading && !systemState.countriesLoaded && systemState.countries.length === 0) {
        dispatch(loadCountriesRequest());
    }

    const filteredCountries = systemState.countries
        .filter(c => c.name.toLowerCase().includes(countryInput)
            || c.code.toLowerCase().includes(countryInput))

    const lowerIndex = page * countriesPerPage;
    const upperIndex = Math.min((page + 1) * countriesPerPage, filteredCountries.length);

    const selectedCountries = filteredCountries.slice(lowerIndex, upperIndex);

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

    const countryFromId = (id: number) => {
        return systemState.countries.find(c => c.id === id);
    }

    return <div>
        <TextField label="Country" size="small" value={countryInput ?? 'All'} 
            onChange={e => { setCountryInput(e.target.value); setPage(0)}}/>
        <div className="w-full overflow-x-scroll flex flex-row gap-2 pt-2">
            {
                props.selectedCountries.map(c => 
                <CountryLabel label={countryFromId(c)?.code ?? c.toString()}>
                    <FontAwesomeIcon onClick={() => props.removeCountry(c)}
                        className="cursor-pointer" icon={faXmarkCircle}/>
                </CountryLabel>)
            }
        </div>
        {
            systemState.loading ? <LoadingSpinner /> :
            selectedCountries.map(c => <CountrySelectorItem
                country={c}
                selected={isSelected(c)}
                onClick={toggleCountry}/>)
        }
        <Pagination count={Math.ceil(filteredCountries.length / countriesPerPage)}
            siblingCount={0} boundaryCount={1} page={page + 1} onChange={(e, page) => setPage(page - 1)} />
        <div className={showReloadButton ? '' : 'hidden'}>
            <Button onClick={() => dispatch(loadCountriesRequest())}>Reload Countries</Button>
        </div>
    </div>
}