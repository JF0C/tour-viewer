import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Pagination, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { clearKomootSelectedTours } from "../../store/komootStateReducer";
import { komootToursRequest } from "../../store/komootThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { BigFormLayout } from "../layout/BigFormLayout";
import { CustomDatePicker } from "../shared/CustomDatePicker";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { KomootTourListItem } from "./KomootTourListItem";


export const KomootTourList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const komootState = useAppSelector((state) => state.komoot);
    const invalid = komootState.toursToDownload.length === 0;
    const [nameFilter, setNameFilter] = useState<string |undefined>();
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    const loadTours = () => {
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            authString: komootState.authString!,
            userId: komootState.userId!
        }));
    }

    if (!komootState.userId || !komootState.authString || !komootState.komootTourData) {
        return <Button onClick={loadTours}>
            Reload
        </Button>
    }

    const changePage = (page: number) => {
        dispatch(komootToursRequest({
            page: page,
            count: komootState.tourPagination.itemsPerPage,
            userId: komootState.userId!,
            authString: komootState.authString!,
            name: nameFilter,
            startDate: startDate,
            endDate: endDate
        }))
    }

    const searchForName = (name: string) => {
        setNameFilter(name);
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            userId: komootState.userId!,
            authString: komootState.authString!,
            name: name,
            startDate: startDate,
            endDate: endDate
        }))
    }

    const searchForStartDate = (date: Date | undefined) => {
        setStartDate(date);
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            userId: komootState.userId!,
            authString: komootState.authString!,
            name: nameFilter,
            startDate: date,
            endDate: endDate
        }))
    }

    const searchForEndDate = (date: Date | undefined) => {
        setEndDate(date);
        dispatch(komootToursRequest({
            page: komootState.tourPagination.page,
            count: komootState.tourPagination.itemsPerPage,
            userId: komootState.userId!,
            authString: komootState.authString!,
            name: nameFilter,
            startDate: startDate,
            endDate: date
        }))
    }

    const clearSelected = () => {
        dispatch(clearKomootSelectedTours());
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
        <NavLink to={Paths.EditTourPage}>
            <Button>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp;Back
            </Button>
        </NavLink>
            <Button onClick={clearSelected} color='error' disabled={invalid}>
                <FontAwesomeIcon icon={faX} />
                &nbsp;Clear
            </Button>
            <NavLink to={invalid ? Paths.KomootTourStartPage : Paths.KomootTourDownloadPage}>
                <Button disabled={invalid}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    &nbsp;Continue
                </Button>
            </NavLink>
        </div>
    }>
        <div className="w-full text-xl font-bold flex flex-row justify-center">
            <img width="30" src="icon/komoot-icon.png" alt='komoot-icon'/>
            &nbsp;Select Tracks for Import
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            <TextField value={nameFilter} label='Tour name' size='small' onChange={e => searchForName(e.target.value)}/>
            <CustomDatePicker label="From" value={startDate} onChange={d => searchForStartDate(d)}/>
            <CustomDatePicker label="To" value={endDate} onChange={d => searchForEndDate(d)} />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            {
                komootState.loading ? <LoadingSpinner /> :
                komootState.komootTourData._embedded?.tours.map(t =>
                    <KomootTourListItem key={t.id} tour={{
                        id: t.id,
                        name: t.name,
                        distance: t.distance,
                        date: t.date,
                        previewImageUrl: t.map_image_preview.src,
                        state: 'ready'
                    }} />
                )
            }
        </div>
        <Pagination sx={{ color: 'white' }} page={komootState.tourPagination.page} count={komootState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)} />
    </BigFormLayout>
}