import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { ModalBaseLayout } from "../ModalBaseLayout";
import { CountryFilterSelector } from "./CountryFilterSelector";
import { CountryLabel } from "./CountryLabel";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { loadCountriesRequest } from "../../../store/systemThunk";

export type CountrySelectorProps = {
    selectedCountries: number[];
    addCountry: (countryId: number) => void;
    removeCountry: (countryId: number) => void;
    resetCountries?: () => void;
    onlyCountriesInUse: boolean;
}

export const CountrySelector: FunctionComponent<CountrySelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const systemState = useAppSelector((state) => state.system);
    const resetAvailable = props.resetCountries !== undefined

    if (systemState.countries.length === 0 && !systemState.loading && !systemState.countriesLoaded) {
        dispatch(loadCountriesRequest());
    }

    const countryFromId = (id: number) => {
        return systemState.countries.find(c => c.id === id);
    }
    const [open, setOpen] = useState(false);

    return <>
    <Button onClick={() => setOpen(true)}>
        {
            props.selectedCountries.length ? 
            <div className="flex flex-row gap-2">
                {
                    props.selectedCountries.slice(0, 3)
                        .map(c => <CountryLabel label={countryFromId(c)?.code ?? c.toString()} />)
                }
                {
                    props.selectedCountries.length > 3 ?
                        <CountryLabel label={`+ ${props.selectedCountries.length - 3}`}/>
                        :<></>
                }
            </div> :
            <>Countries</>
        }
    </Button>
    <ModalBaseLayout open={open} openChange={setOpen} bottomRow={
        <div className={`w-full flex flex-row ${resetAvailable ? 'justify-between' : 'justify-center'}`}>
            {
                resetAvailable ? 
                    <Button onClick={() => {
                        props.resetCountries?.();
                        setOpen(false);
                    }}>Reset</Button> :
                <></>
            }
            <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
    }>
        <CountryFilterSelector onlyCountriesInUse={props.onlyCountriesInUse} selectedCountries={props.selectedCountries}
            addCountry={props.addCountry} removeCountry={props.removeCountry}
        />
    </ModalBaseLayout>
</>
}