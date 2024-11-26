import { FunctionComponent } from "react";
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

export const StravaActivityList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const stravaState = useAppSelector((state) => state.strava);
    const invalid = stravaState.tracksToDownload.length === 0;

    if (stravaState.tokenData === undefined || stravaState.authenticationFailed) {
        return <div>authentication error</div>
    }

    const changePage = (page: number) => {
        dispatch(stravaActivitiesRequest({
            token: stravaState.tokenData!.accessToken,
            page: page,
            count: stravaState.tourPagination.itemsPerPage
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
            &nbsp;Select Tours for Import
        </div>
        <div className="flex flex-row flex-wrap gap-2">
            {
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