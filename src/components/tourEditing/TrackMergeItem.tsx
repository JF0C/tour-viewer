import { FunctionComponent } from "react";
import { ITrackEntity } from "../../store/trackStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { millisToDateString } from "../../converters/dateConverters";
import { addTrackToMerge, removeTrackToMerge } from "../../store/tourStateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export type TrackMergeItemProps = {
    track: ITrackEntity
}

export const TrackMergeItem: FunctionComponent<TrackMergeItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const selectedForMerge = useAppSelector((state) => state.tour.editingTour.tracksToMerge)
    const isSelected = selectedForMerge.includes(props.track.fileReference);
    
    const toggleTrack = () => {
        if (isSelected) {
            dispatch(removeTrackToMerge(props.track.fileReference));
        }
        else {
            dispatch(addTrackToMerge(props.track.fileReference));
        }
    }

    return <tr onClick={toggleTrack} className={isSelected ? 'bg-primary' : ''}>
        <td>
            { props.track.data.name }
        </td>
        <td>
            { props.track.tourPosition }
        </td>
        <td>
            { millisToDateString(props.track.data.points[0].time) }
        </td>
        <td>
            {
                isSelected ? <FontAwesomeIcon icon={faCheckSquare} />:
                <></>
            }
        </td>
    </tr>
}