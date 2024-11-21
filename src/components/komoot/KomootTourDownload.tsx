import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { BigFormLayout } from "../layout/BigFormLayout";
import { TrackConfirmContent } from "./TrackConfirmContent";
import { KomootTourListItem } from "./KomootTourListItem";
import { komootGpxTourRequest } from "../../store/komootThunk";
import { KomootLogin } from "./KomootLogin";
import { createTrackRequest } from "../../store/trackThunk";
import { ExternalSources } from "../../constants/ExternalSources";
import { loadTourRequest } from "../../store/tourThunk";
import { setEditingTour } from "../../store/tourStateReducer";
import { removeSelectedKomootTour } from "../../store/komootStateReducer";

export const KomootTourDownload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const komootState = useAppSelector((state) => state.komoot);
    const selectedTours = komootState.toursToDownload;
    const isLoading = Boolean(selectedTours.find(t => t.state === 'loading'));
    const isFailed = Boolean(selectedTours.find(t => t.state === 'error'));
    const editingTour = useAppSelector((state) => state.tour.editingTour);
    const isEditingTour = editingTour.id > 0;

    if (!komootState.userId || !komootState.authString) {
        return <KomootLogin />
    }

    const reloadTour = () => {
        if (isLoading) {
            return;
        }
        dispatch(loadTourRequest(editingTour.id))
            .unwrap()
            .then((tour) => dispatch(setEditingTour(tour)))
    }

    if (selectedTours.every(t => t.state === 'finished')) {
        reloadTour();
        navigate(Paths.EditTourPage);
    }

    if (selectedTours.every(t => t.state === 'finished' || t.state === 'error')) {
        for (let t of selectedTours) {
            if (t.state === 'finished') {
                dispatch(removeSelectedKomootTour(t.id));
            }
        }
    }

    const startDownloads = () => {
        const nextTrackPosition = editingTour.tracks
            .map(t => t.tourPosition).reduce((a, b) => Math.max(a, b)) + 1;
        selectedTours.forEach((tour, index) => {
            dispatch(komootGpxTourRequest({
                tourId: tour.id,
                userId: komootState.userId!,
                authString: komootState.authString!
            })).unwrap()
            .then((gpx) => {
                dispatch(createTrackRequest({
                    tourId: editingTour.id,
                    id: 0,
                    name: tour.name,
                    data: gpx,
                    tourPosition: nextTrackPosition + index,
                    externalId: tour.id,
                    externalSource: ExternalSources.Komoot
                }));
            });
        });
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
            <NavLink to={isLoading ? Paths.KomootTourDownloadPage : Paths.KomootTourStartPage} onClick={reloadTour}>
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
                selectedTours.map(t =>
                    <KomootTourListItem tour={t}>
                        {
                            t.state === 'ready' ?
                                <TrackConfirmContent tour={t} />
                            : t.state
                        }
                    </KomootTourListItem>
                )
            }
        </div>
    </BigFormLayout>
}