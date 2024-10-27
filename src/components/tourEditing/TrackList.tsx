import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TrackListItem } from "./TrackListItem";
import { loadTourRequest } from "../../store/tourThunk";
import { NewTrackItem } from "./NewTrackItem";
import { Button } from "@mui/material";
import { startEditingTour } from "../../store/tourStateReducer";

export const TrackList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.editingTour);
    const selectedTour = useAppSelector((state) => state.tour.selectedTour);

    const nextTrackPosition = tour.tracks.length > 1 ?
        (tour.tracks.map(t => t.tourPosition).reduce((a, b) => Math.max(a, b)) + 1) :
        tour.tracks.length === 1 ? (tour.tracks[0].tourPosition + 1) :
            1;

    const reloadTour = () => {
        dispatch(loadTourRequest(tour.id))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    if (selectedTour) {
                        dispatch(startEditingTour(selectedTour))
                    }
                }, 100)
            })
    }

    return <table>
        <thead className="text-left">
            <tr>
                <th>
                    Track
                </th>
                <th>
                    Position
                </th>
                <th>
                    File
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                tour.tracks.map(t => <TrackListItem key={t.id} track={t} onDataChanged={reloadTour} />)
            }
            <NewTrackItem onDataChanged={reloadTour} initialPosition={nextTrackPosition} tourId={tour.id} />
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <Button onClick={reloadTour}>Reload</Button>
                </td>
            </tr>
        </tfoot>
    </table>
}