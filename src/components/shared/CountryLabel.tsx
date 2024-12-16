import { FunctionComponent } from "react";
import { CountryDto } from "../../dtos/shared/countryDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadCountriesRequest } from "../../store/systemThunk";

export type CountryLabelProps = {
    countryId: number
}

export const CountryLabel: FunctionComponent<CountryLabelProps> = (props) => {
    const dispatch = useAppDispatch();
    const systemState = useAppSelector((state) => state.system);

    if (systemState.countries.length === 0 && !systemState.loading && !systemState.countriesLoaded) {
        dispatch(loadCountriesRequest());
    }
    const countryFromId = (id: number) => {
        return systemState.countries.find(c => c.id === id);
    }

    return <div className="flex flex-row items-center border border-white rounded-full px-2">
        {countryFromId(props.countryId)?.code}
    </div>
}