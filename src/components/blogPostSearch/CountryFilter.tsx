import { FunctionComponent, useState } from "react";
import { ModalBaseLayout } from "../shared/ModalBaseLayout";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CountryFilterSelector } from "../shared/CountryFilterSelector";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";
import { CountryLabel } from "../shared/CountryLabel";

export const CountryFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);
    const [open, setOpen] = useState(false);

    const addCountryToFilter = (id: number) => {
        const countries: number[] = [];
        blogPostState.filter.countries?.forEach(c => countries.push(c));
        if (countries.includes(id)) {
            return;
        }
        countries.push(id)
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            countries: countries
        }));
    }

    const resetCountryFilter = () => {
        setOpen(false);
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            countries: undefined
        }));
    }

    const removeCountryFromFilter = (id: number) => {
        const countries: number[] = [];
        blogPostState.filter.countries?.forEach(c => {
            if (c !== id) {
                countries.push(c);
            }
        });
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            countries: countries.length === 0 ? undefined : countries
        }));
    }

    return <>
        <Button onClick={() => setOpen(true)}>
            {
                blogPostState.filter.countries ? 
                blogPostState.filter.countries.map(c => <CountryLabel countryId={c} />) :
                <>Countries</>
            }
        </Button>
        <ModalBaseLayout open={open} openChange={setOpen} bottomRow={
            <div className="w-full flex flex-row justify-between">
                <Button onClick={resetCountryFilter}>Reset</Button>
                <Button onClick={() => setOpen(false)}>Done</Button>
            </div>
        }>
            <CountryFilterSelector selectedCountries={blogPostState.filter.countries ?? []}
                addCountry={addCountryToFilter} removeCountry={removeCountryFromFilter}
            />
        </ModalBaseLayout>
    </>
}