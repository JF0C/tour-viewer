import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TourSearchFilter } from "../../data/tourSearchFilter";
import { searchTours } from "../../store/tourThunk";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { setTourSearchFilter } from "../../store/tourStateReducer";
import { ParticipantSelector } from "./ParticipantSelector";
import { TourNameFilter } from "./TourNameFilter";
import { CountryFilter } from "../shared/CountryFilter/CountryFilter";

export const TourFilterControls: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const [years, months] = useMemo(() => {
        const years: number[] = [];
        const maxYear = (new Date()).getFullYear() + 3;
        const minYear = 2010;
        for (let y = minYear; y < maxYear; y++) {
            years.push(y);
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return [years, months];
    }, [])

    const search = (filter: TourSearchFilter) => {
        dispatch(setTourSearchFilter(filter));
    }

    useEffect(() => {
        const request = {
            ...tourState.tourSearchFilter,
            page: tourState.tourPagination.page,
            count: tourState.tourPagination.itemsPerPage
        }
        dispatch(searchTours(request));
    }, [
        tourState.tourPagination.itemsPerPage,
        tourState.tourPagination.page,
        tourState.tourSearchFilter.month,
        tourState.tourSearchFilter.year,
        tourState.tourSearchFilter.participantId,
        tourState.tourSearchFilter.name,
        tourState.tourSearchFilter.countries
    ])

    return <div className="flex flex-row flex-wrap gap-2">
        <TourNameFilter />
        <div className="flex flex-row">
            <FormControl fullWidth size="small">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="tour-year-select"
                    value={tourState.tourSearchFilter.year ?? 0}
                    label="Year"
                    onChange={(e) => {
                        search({
                            ...tourState.tourSearchFilter,
                            year: e.target.value === 0 ? undefined : Number(e.target.value),
                            month: e.target.value === 0 ? undefined : tourState.tourSearchFilter.month
                        })
                    }}
                >
                    <MenuItem value={0}>All</MenuItem>
                    {
                        years.map(y => <MenuItem key={'tour-year-filter-' + y} value={y}>
                            {y.toString()}
                        </MenuItem>)
                    }
                </Select>
            </FormControl>
            {
                tourState.tourSearchFilter.year ?
                    <Button sx={{ minWidth: '40px', color: 'white' }} onClick={() => search({ ...tourState.tourSearchFilter, year: undefined, month: undefined })}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </Button>
                    : <></>
            }
        </div>
        {
            tourState.tourSearchFilter.year !== undefined ?
                <div className="flex flex-row">
                    <FormControl fullWidth size="small">
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select
                            sx={{ color: 'white' }}
                            labelId="month-select-label"
                            id="tour-month-select"
                            value={tourState.tourSearchFilter.month ?? 0}
                            label="Month"
                            onChange={(e) => {
                                search({
                                    ...tourState.tourSearchFilter,
                                    month: e.target.value === 0 ? undefined : Number(e.target.value)
                                })
                            }}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            {
                                months.map((m, i) => <MenuItem key={'tour-month-filter-' + i} value={i + 1}>
                                    {m}
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    {
                        tourState.tourSearchFilter.month ?
                            <Button sx={{ minWidth: '40px', color: 'white' }} onClick={() => search({ ...tourState.tourSearchFilter, month: undefined })}>
                                <FontAwesomeIcon icon={faXmarkCircle} />
                            </Button>
                            : <></>
                    }
                </div>
                : <></>
        }
        <ParticipantSelector />
        <CountryFilter onlyCountriesInUse
            stateSliceSelector={(state) => state.tour}
            countriesSelector={(state) => state.tour.tourSearchFilter.countries ?? []}
            setCountries={(dispatch, tourState, countries) => {
                dispatch(setTourSearchFilter({
                    ...tourState.tourSearchFilter,
                    countries: countries
                }))
            }}
        />
    </div>
}
