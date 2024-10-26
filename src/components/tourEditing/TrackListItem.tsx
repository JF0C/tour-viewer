import { FunctionComponent } from "react"
import { EditTrackDto } from "../../dtos/editTrackDto"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { ConfirmModal } from "../shared/ConfirmModal"
import { useAppDispatch } from "../../store/store"
import { deleteTrackRequest } from "../../store/trackThunk"

export type TrackListItemProps = {
    track: EditTrackDto
    onDataChanged: () => void
}

export const TrackListItem: FunctionComponent<TrackListItemProps> = (props) => {
    const dispatch = useAppDispatch();

    const deleteTrack = () => {
        dispatch(deleteTrackRequest(props.track.id))
            .unwrap()
            .then(() => {
                props.onDataChanged()
            })
    }

    return <tr>
        <td>
            { props.track.name }
        </td>
        <td>
            { props.track.tourPosition }
        </td>
        <td>
            { props.track.data === '' ? 'no data' : props.track.data.length }
        </td>
        <td>
            <ConfirmModal type='warning' message={`Confirm deletion of track ${props.track.name}`}
                buttonContent={<><FontAwesomeIcon icon={faTrash} />&nbsp;Delete</>} onConfirm={deleteTrack}/>
        </td>
    </tr>
}