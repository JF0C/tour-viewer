import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { ticksToDateString } from "../../converters/dateConverters";


export const TourData: FunctionComponent = () => {
    const tracks = useAppSelector((state) => state.track.tracks);
    const selectedTracks = tracks.filter(t => t.selected);
    const tour = useAppSelector((state) => state.tour.selectedTour);

    if (selectedTracks.length === 0) {
        return <div>
            No Tour Data
        </div>
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

    const startDate = selectedTracks[0].data.points[0].time;
    const endDate = selectedTracks[selectedTracks.length - 1].data.points[0].time;


    return <table>
        <thead>
            <tr>
                <th colSpan={2}>
                    {title}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    Date
                </td>
                <td>
                    {ticksToDateString(startDate)}
                    {
                        endDate !== startDate ?
                            ` - ${ticksToDateString(endDate)}`
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
        </tbody>
    </table>
}