import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingTour } from "../../store/tourStateReducer";
import { deleteTourRequest, loadTourRequest, searchTours } from "../../store/tourThunk";
import { resetBoundsSet } from "../../store/trackStateReducer";
import { NewTrackItem } from "./NewTrackItem";
import { TrackListItem } from "./TrackListItem";
import { Paths } from "../../constants/Paths";
import { ConfirmModal } from "../shared/ConfirmModal";

export const TrackList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.editingTour);
    const pagination = useAppSelector((state) => state.tour.tourPagination);
    const navigate = useNavigate();

    const nextTrackPosition = tour.tracks.length > 1 ?
        (tour.tracks.map(t => t.tourPosition).reduce((a, b) => Math.max(a, b)) + 1) :
        tour.tracks.length === 1 ? (tour.tracks[0].tourPosition + 1) :
            1;

    const reloadTour = () => {
        dispatch(loadTourRequest(tour.id))
            .unwrap()
            .then((tour) => dispatch(setEditingTour(tour)))
    }

    const cancelEditing = () => {
        dispatch(resetBoundsSet());
        navigate(-1);
    }

    const deleteTour = () => {
        dispatch(deleteTourRequest(tour.id))
            .unwrap().then(() => {
                dispatch()
                dispatch(searchTours({
                    page: pagination.page,
                    count: pagination.itemsPerPage
                })).then(() => navigate(Paths.HomePage));
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
                tour.tracks.map(t => <TrackListItem key={'track-item-' + t.id} track={t} onDataChanged={reloadTour} />)
            }
            <NewTrackItem onDataChanged={reloadTour} initialPosition={nextTrackPosition} tourId={tour.id} />
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={4} className="flex flex-row gap-2">
                    <Button onClick={reloadTour}>Reload</Button>
                    <Button color='warning' onClick={cancelEditing}>Cancel</Button>
                    <ConfirmModal type='error' onConfirm={deleteTour} 
                        message={`Do you really want to delete tour ${tour.name}`} 
                        buttonContent={<>Delete</>}/>
                </td>
            </tr>
        </tfoot>
    </table>
}