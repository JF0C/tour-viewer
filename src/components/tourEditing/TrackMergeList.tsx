import { faArrowLeft, faCodeMerge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { mergeTracksToGpx } from "../../converters/trackMergeConverter";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearTracksToMerge, setEditingTour } from "../../store/tourStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { clearTracks } from "../../store/trackStateReducer";
import { createTrackRequest, deleteTrackRequest, loadTrackRequest } from "../../store/trackThunk";
import { BigFormLayout } from "../layout/BigFormLayout";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TrackMergeItem } from "./TrackMergeItem";

export const TrackMergeList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const editingTour = tourState.editingTour;
    const tracks = useAppSelector((state) => state.track.tracks);
    const [pendingDeletes, setPendingDeletes] = useState<number[]>([]);
    const [mergedTrackName, setMergedTrackName] = useState<string | undefined>(undefined);

    if (tourState.loading) {
        return <LoadingSpinner />
    }

    const reloadTour = () => {
        dispatch(loadTourRequest(editingTour.id))
            .unwrap()
            .then(tour => {
                dispatch(setEditingTour(tour));
                dispatch(clearTracks());
                for(let track of tour.tracks) {
                    dispatch(loadTrackRequest({
                        id: track.id,
                        fileReference: track.fileReference,
                        name: track.name,
                        tourPosition: track.tourPosition
                    }));
                }
            });
    }

    const mergeTracks = () => {
        const tracksToMerge = tracks.filter(t => editingTour.tracksToMerge.includes(t.fileReference))
            .sort((a, b) => a.tourPosition - b.tourPosition);
        if (tracksToMerge.length < 2) {
            enqueueSnackbar('error merging tracks', { variant: 'error' })
            return;
        }
        const trackName = mergedTrackName ?? tracksToMerge[0].data.name
        dispatch(createTrackRequest({
            id: 0,
            tourId: editingTour.id,
            name: trackName,
            data: mergeTracksToGpx(tracksToMerge, trackName),
            tourPosition: tracksToMerge[0].tourPosition
        })).unwrap()
            .then(() => {
                tracksToMerge.forEach(track => {
                    const trackId = tourState.selectedTour?.tracks.find(t => t.fileReference === track.fileReference)?.id;
                    if (trackId) {
                        setPendingDeletes(pendingDeletes.concat(trackId))
                        dispatch(deleteTrackRequest(trackId)).unwrap()
                            .then(() => {
                                setPendingDeletes(pendingDeletes.filter(id => id !== trackId));
                                setTimeout(() => {
                                    if (pendingDeletes.length === 0) {
                                        reloadTour();
                                    }
                                }, 100);
                            });
                    }
                })
            });
    }

    return <BigFormLayout buttons={
        <div className="flex flex-row w-full justify-between">
            <NavLink to={Paths.EditTourPage} onClick={() => dispatch(clearTracksToMerge())}>
                <Button>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    &nbsp;
                    Back
                </Button>
            </NavLink>
            <Button onClick={mergeTracks} disabled={editingTour.tracksToMerge.length < 2}>
                <FontAwesomeIcon icon={faCodeMerge} />
                &nbsp;
                Merge
            </Button>
        </div>
    }>
        <TextField label="Name of merged Track" size='small'
            onChange={e => setMergedTrackName(e.target.value)} />
        <table>
            <thead className="text-left">
                <tr>
                    <th>
                        Trackname
                    </th>
                    <th>
                        Tour Position
                    </th>
                    <th>
                        Start Date
                    </th>
                    <th>
                        Selected
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                tracks.map(t => <TrackMergeItem track={t}/>)
            }
            </tbody>
        </table>
    </BigFormLayout>
}