import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { millisToDateString, millisToTimeSpan } from "../../converters/dateConverters";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { InfobarMaxButton } from "../shared/InfobarMaxButton";
import { Participant } from "../tourEditing/Participant";
import { setInfobarOpen } from "../../store/viewState";

export const TourData: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.track.tracks);
    const selectedTracks = tracks.filter(t => t.selected);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const infobarOpen = useAppSelector((state) => state.view.infobarOpen);

    if (!infobarOpen) {
        return <></>
    }

    if (selectedTracks.length === 0) {
        return <div className="flex flex-row justify-between">
            <div className="font-bold">
                No Tour Selected
            </div>
            <Button style={{ minWidth: '20px' }}
                onClick={() => dispatch(setInfobarOpen(false))}>
                <FontAwesomeIcon icon={faX} />
            </Button>
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


    return <div className="w-full flex flex-col h-full info-bar-content">
        <div className="p-2 w-full flex flex-row justify-between items-center text-xl font-bold bg-primary">
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
            <div className="flex flex-row">
                <InfobarMaxButton />
                <Button style={{ minWidth: '20px' }}
                    onClick={() => dispatch(setInfobarOpen(false))}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
        <div className="flex-1 overflow-y-scroll p-2">
            <table className="w-full">
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <div className="flex gap-2 flex-wrap">
                                {
                                    tour?.participants.map(p =>
                                        <Participant key={'participant-' + p.id} user={p} linkToProfile canRemove={false} />)
                                }

                            </div>
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
                            {(distance / movementTime * 3_600_000).toFixed(2)} km/h
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}