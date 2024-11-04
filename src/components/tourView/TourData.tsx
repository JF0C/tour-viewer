import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { millisToDateString, millisToTimeSpan } from "../../converters/dateConverters";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { showInfobar } from "../../store/tourStateReducer";
import { Participant } from "../tourEditing/Participant";

export const TourData: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.track.tracks);
    const selectedTracks = tracks.filter(t => t.selected);
    const tour = useAppSelector((state) => state.tour.selectedTour);

    if (selectedTracks.length === 0) {
        return <div>
            No Tour Data
        </div>
    }
    let trackNumber = '';
    if (selectedTracks.length === 1) {
        const id = selectedTracks[0].fileReference;
        let num = 1;
        for (let t of tracks) {
            if (t.fileReference === id) {
                break;
            }
            num++;
        }
        trackNumber = `${num}/${tracks.length}`;
    }

    const title = selectedTracks.length === 1 ?
        selectedTracks[0].data.name :
        tour?.name;

    const distance = selectedTracks
        .map(t => t.data.distance)
        .reduce((a, b) => a + b)
        / 1000;

    const positive = selectedTracks
        .map(t => t.data.elevation.positive)
        .reduce((a, b) => a + b);

    const negative = selectedTracks
        .map(t => t.data.elevation.negative)
        .reduce((a, b) => a + b);

    const time = selectedTracks
        .map(t => t.data.totalTime)
        .reduce((a, b) => a + b);

    const movementTime = selectedTracks
        .map(t => t.data.totalMovementTime)
        .reduce((a, b) => a + b);

    const startDate = selectedTracks[0].data.points[0].time;
    const endDate = selectedTracks[selectedTracks.length - 1].data.points[0].time;


    return <table className="w-full">
        <thead>
            <tr>
                <th colSpan={2}>
                    <div className="w-full flex flex-row justify-between items-center">
                        {
                            trackNumber !== '' ?
                                <div>
                                    {trackNumber}
                                </div>
                                : <></>
                        }
                        <div>
                            {title}
                        </div>
                        <div>
                            <Button style={{ zIndex: '1000', minWidth: '20px' }}
                                onClick={() => dispatch(showInfobar(false))}>
                                <FontAwesomeIcon icon={faX} />
                            </Button>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colSpan={2} className="flex gap-2 flex-wrap">
                    {
                        tour?.participants.map(p =>
                            <Participant key={'participant-' + p.id} name={p.username} id={p.id} canRemove={false} />)
                    }
                </td>
            </tr>
            <tr>
                <td>
                    Date
                </td>
                <td>
                    {millisToDateString(startDate)}
                    {
                        endDate !== startDate ?
                            ` - ${millisToDateString(endDate)}`
                            : ''
                    }
                </td>
            </tr>
            <tr>
                <td>
                    Distance
                </td>
                <td>
                    {distance.toFixed(2)} km
                </td>
            </tr>
            <tr>
                <td>
                    Positive Elevation
                </td>
                <td>
                    {positive.toFixed(0)} m
                </td>
            </tr>
            <tr>
                <td>
                    Negative Elevation
                </td>
                <td>
                    {negative.toFixed(0)} m
                </td>
            </tr>
            <tr>
                <td>
                    Total Time
                </td>
                <td>
                    {millisToTimeSpan(time)}
                </td>
            </tr>
            <tr>
                <td>
                    Movement Time
                </td>
                <td>
                    {millisToTimeSpan(movementTime)}
                </td>
            </tr>
            <tr>
                <td>
                    Movement Velocity
                </td>
                <td>
                    {(distance / movementTime * 3600000).toFixed(2)} km/h
                </td>
            </tr>
        </tbody>
    </table>
}