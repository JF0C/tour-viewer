import { FunctionComponent, useRef, useState } from "react"
import { EditTrackDto } from "../../dtos/editTrackDto"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { ConfirmModal } from "../shared/ConfirmModal"
import { useAppDispatch } from "../../store/store"
import { deleteTrackRequest } from "../../store/trackThunk"
import { Popover } from "@mui/material"

export type TrackListItemProps = {
    track: EditTrackDto
    onDataChanged: () => void
}

export const TrackListItem: FunctionComponent<TrackListItemProps> = (props) => {
    const dispatch = useAppDispatch();

    const [fileNameOpen, setFileNameOpen] = useState(false);
    const filenameRef = useRef<HTMLSpanElement>(null);

    const deleteTrack = () => {
        dispatch(deleteTrackRequest(props.track.id))
            .unwrap()
            .then(() => {
                props.onDataChanged()
            })
    }

    return <tr key={'track' + props.track.id}>
        <td>
            { props.track.name }
        </td>
        <td>
            { props.track.tourPosition }
        </td>
        <td className="truncate max-w-11">
            <span ref={filenameRef} onClick={() => setFileNameOpen(!fileNameOpen)}>
                { props.track.data === '' ? 'no data' : props.track.data }
            </span>
            <Popover anchorEl={filenameRef.current} 
                open={fileNameOpen} onClose={() => setFileNameOpen(false)}>
                    <div className="p-2">
                        { props.track.data }
                    </div>
            </Popover>
        </td>
        <td>
            <ConfirmModal type='warning' message={`Confirm deletion of track ${props.track.name}`}
                buttonContent={<><FontAwesomeIcon icon={faTrash} />&nbsp;Delete</>} onConfirm={deleteTrack}/>
        </td>
    </tr>
}