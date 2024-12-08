import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { BigFormLayout } from "../layout/BigFormLayout";
import { StravaActivityListItem } from "./StravaActivityListItem";
import { Button, Pagination } from "@mui/material";
import { stravaActivitiesRequest } from "../../store/stravaThunk";
import { faArrowLeft, faX, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { clearToursToDownload } from "../../store/stravaStateReducer";
import { useStravaRefreshToken } from "../../hooks/stravaRefreshTokenHook";
import { CustomDatePicker } from "../shared/CustomDatePicker";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const StravaActivityList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [, setRefreshToken] = useStravaRefreshToken();
    const stravaState = useAppSelector((state) => state.strava);
    const invalid = stravaState.tracksToDownload.length === 0;
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    if (stravaState.tokenData === undefined || stravaState.authenticationFailed) {
        return <div>authentication error</div>
    }

    const stravaLogout = () => {
        setRefreshToken(null);
    }

    const changePage = (page: number) => {
        let endEpoch = endDate?.valueOf();
        if (endEpoch) {
            endEpoch /= 1000;
        }
        let startEpoch = startDate?.valueOf();
        if (startEpoch) {
            startEpoch /= 1000;
        }
        dispatch(stravaActivitiesRequest({
            token: stravaState.tokenData!.accessToken,
            page: page,
            count: stravaState.tourPagination.itemsPerPage,
            before: endEpoch,
            after: startEpoch
        }));
    }

    const searchForStartDate = (date: Date | undefined) => {
        setStartDate(date);
        let endEpoch = endDate?.valueOf();
        if (endEpoch) {
            endEpoch /= 1000;
        }
        let startEpoch = date?.valueOf();
        if (startEpoch) {
            startEpoch /= 1000;
        }
        dispatch(stravaActivitiesRequest({
            token: stravaState.tokenData!.accessToken,
            page: stravaState.tourPagination.page,
            count: stravaState.tourPagination.itemsPerPage,
            before: endEpoch,
            after: startEpoch
        }));
    }

    const searchForEndDate = (date: Date | undefined) => {
        setEndDate(date);
        let endEpoch = date?.valueOf();
        if (endEpoch) {
            endEpoch /= 1000;
        }
        let startEpoch = startDate?.valueOf();
        if (startEpoch) {
            startEpoch /= 1000;
        }
        dispatch(stravaActivitiesRequest({
            token: stravaState.tokenData!.accessToken,
            page: stravaState.tourPagination.page,
            count: stravaState.tourPagination.itemsPerPage,
            before: endEpoch,
            after: startEpoch
        }));
    }

    const clearSelected = () => {
        dispatch(clearToursToDownload());
    }

    const loadActivities = () => {
        changePage(1);
    }

    if (stravaState.tours === undefined) {
        loadActivities();
        return <></>
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
            <NavLink to={Paths.EditTourPage}>
                <Button>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    &nbsp;Back
                </Button>
            </NavLink>
            <NavLink to={Paths.EditTourPage} onClick={stravaLogout}>
                <Button color="warning">
                    <FontAwesomeIcon icon={faX} />
                    &nbsp;Logout
                </Button>
            </NavLink>
            <Button onClick={clearSelected} color='error' disabled={invalid}>
                <FontAwesomeIcon icon={faX} />
                &nbsp;Clear
            </Button>
            <NavLink to={invalid ? Paths.StravaTourStartPage : Paths.StravaDownloadPage}>
                <Button disabled={invalid}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    &nbsp;Continue
                </Button>
            </NavLink>
        </div>
    }>
        <div className="w-full flex flex-row justify-center text-xl font-bold">
            <img width="30" src="icon/strava-icon.png" alt='komoot-icon' />
            &nbsp;Select Tracks for Import
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            <CustomDatePicker label="From" value={startDate} onChange={d => searchForStartDate(d)} />
            <CustomDatePicker label="To" value={endDate} onChange={d => searchForEndDate(d)} />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            {
                stravaState.loading ? <LoadingSpinner /> :
                stravaState.tours.map(t =>
                    <StravaActivityListItem key={t.id} tour={{
                        id: t.id.toString(),
                        name: t.name,
                        distance: t.distance,
                        date: t.start_date.valueOf(),
                        previewImageUrl: t.map.summary_polyline,
                        state: 'ready'
                    }} />
                )
            }
        </div>
        <Pagination sx={{ color: 'white' }} page={stravaState.tourPagination.page} count={stravaState.tourPagination.totalPages} siblingCount={0} boundaryCount={1}
            onChange={(e: any, page: number) => changePage(page)} />
    </BigFormLayout>
}