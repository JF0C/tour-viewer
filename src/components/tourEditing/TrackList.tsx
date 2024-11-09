import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { NewTrackItem } from "./NewTrackItem";
import { TrackListItem } from "./TrackListItem";

export type TrackListProps = {
    onReload?: () => void
}

export const TrackList: FunctionComponent<TrackListProps> = (props) => {
    const tour = useAppSelector((state) => state.tour.editingTour);

    const nextTrackPosition = tour.tracks.length > 1 ?
        (tour.tracks.map(t => t.tourPosition).reduce((a, b) => Math.max(a, b)) + 1) :
        tour.tracks.length === 1 ? (tour.tracks[0].tourPosition + 1) :
            1;

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
                tour.tracks.map(t => <TrackListItem key={'track-item-' + t.id} track={t} 
                    onDataChanged={() => props.onReload?.()} />)
            }
            <NewTrackItem onDataChanged={() => props.onReload?.()} initialPosition={nextTrackPosition} tourId={tour.id} />
        </tbody>
    </table>
}