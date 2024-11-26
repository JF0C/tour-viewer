import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { stravaActivityDetailRequest } from "../../store/stravaThunk";
import { setEditingTour } from "../../store/tourStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { createTrackRequest } from "../../store/trackThunk";
import { BigFormLayout } from "../layout/BigFormLayout";
import { ActivityDownloadContent } from "./ActivityDownloadContent";
import { StravaActivityListItem } from "./StravaActivityListItem";
import { clearToursToDownload, removeTourToDownload } from "../../store/stravaStateReducer";
import { ExternalSources } from "../../constants/ExternalSources";

export const StravaActivityDownload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const stravaState = useAppSelector((state) => state.strava);
    const tracksToDownload = stravaState.tracksToDownload;
    const isLoading = Boolean(tracksToDownload.find(t => t.state === 'loading'));
    const isFailed = Boolean(tracksToDownload.find(t => t.state === 'error'));
    const editingTour = useAppSelector((state) => state.tour.editingTour);
    const isEditingTour = editingTour.id > 0;

    const startDownloads = () => {
        const nextTrackPosition = editingTour.tracks.length === 0 ? 1 : editingTour.tracks
            .map(t => t.tourPosition).reduce((a, b) => Math.max(a, b)) + 1;
        tracksToDownload.forEach((track, index) => {
            dispatch(stravaActivityDetailRequest({
                token: stravaState.tokenData?.accessToken!,
                activityId: track.id,
                name: track.name,
                start_date: track.date
            })).unwrap()
            .then((gpx) => {
                dispatch(createTrackRequest({
                    tourId: editingTour.id,
                    externalSource: ExternalSources.Strava,
                    externalId: track.id,
                    data: gpx,
                    id: 0,
                    name: track.name,
                    tourPosition: index + nextTrackPosition
                }));
            });
        });
    }

    const reloadTour = () => {
        if (isLoading || editingTour.id === 0) {
            return;
        }
        dispatch(loadTourRequest(editingTour.id))
            .unwrap()
            .then((tour) => dispatch(setEditingTour(tour)))
    }

    if (tracksToDownload.every(t => t.state === 'finished')) {
        reloadTour();
        navigate(Paths.EditTourPage);
        dispatch(clearToursToDownload());
    }

    if (tracksToDownload.every(t => t.state === 'finished' || t.state === 'error')) {
        for (let t of tracksToDownload) {
            if (t.state === 'finished') {
                dispatch(removeTourToDownload(t.id));
            }
        }
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
            <NavLink to={isLoading ? Paths.StravaDownloadPage : Paths.StravaTourStartPage} onClick={reloadTour}>
                <Button onClick={() => {}} disabled={isLoading}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    &nbsp;Back
                </Button>
            </NavLink>
            <Button color='success' onClick={startDownloads} disabled={isLoading || !isEditingTour}>
                <FontAwesomeIcon icon={faDownload} />
                &nbsp;
                { isFailed ? 'Retry Failed Tracks' : 'Load Tracks' }
            </Button>
        </div>
    }>
        <div className="flex flex-row flex-wrap gap-2">
            {
                tracksToDownload.map(t => 
                    <StravaActivityListItem tour={t}>
                        <ActivityDownloadContent track={t}/>
                    </StravaActivityListItem>
                )
            }
        </div>
    </BigFormLayout>
}