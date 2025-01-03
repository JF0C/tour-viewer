import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { setInfobarOpen } from "../../store/viewStateReducer";
import { AuthorSelector } from "./AuthorSelector";
import { DateRangePicker } from "./DateRangePicker";
import { BlogPostTitleFilter } from "./BlogPostTitleFilter";
import { TourFilter } from "./TourFilter";
import { LabelsFilter } from "./LabelsFilter";
import { SearchPagination } from "./SearchPagination";
import { CountryFilter } from "../shared/CountryFilter/CountryFilter";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";

export const BlogPostFilterControls: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const blogPostState = useAppSelector((state) => state.blog);

    const close = () => {
        dispatch(setInfobarOpen(false));
    }

    return <div className="info-bar-content flex flex-col" >
        <div className="p-2 flex flex-row justify-between text-xl items-center bg-primary mb-2">
            <div className="font-bold flex-1">
                Blog Post Filter
            </div>
            <div className="flex flex-row">
                <Button onClick={close} style={{ minWidth: '20px' }}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2 p-2">
            <BlogPostTitleFilter />
            <TourFilter />
            <AuthorSelector />
            <LabelsFilter />
            <CountryFilter
                onlyCountriesInUse
                stateSliceSelector={(state) => state.blog} 
                countriesSelector={(state) => state.blog.filter.countries ?? []}
                setCountries={(dispatch, blogPostState, countries) => {
                    dispatch(setBlogPostSearchFilter({...blogPostState.filter, countries: countries}))
                }} />
            <DateRangePicker />
            <SearchPagination />
        </div>
    </div>
}