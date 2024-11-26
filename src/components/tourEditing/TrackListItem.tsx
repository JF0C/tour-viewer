import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Popover } from "@mui/material"
import { FunctionComponent, useRef, useState } from "react"
import { EditTrackDto } from "../../dtos/track/editTrackDto"
import { useAppDispatch } from "../../store/store"
import { changeTrackNameRequest, changeTrackPositionRequest, deleteTrackRequest } from "../../store/trackThunk"
import { BaseConfirmModal } from "../shared/BaseConfirmModal"
import { ConfirmModal } from "../shared/ConfirmModal"
import { ValidatingInput } from "../shared/ValidatingInput"
import { ValidatingNumberInput } from "../shared/ValidatingNumberInput"

export type TrackListItemProps = {
    track: EditTrackDto
    onDataChanged: () => void
}

export const TrackListItem: FunctionComponent<TrackListItemProps> = (props) => {
    const dispatch = useAppDispatch();

    const [fileNameOpen, setFileNameOpen] = useState(false);
    const [changedTrackName, setChangedTrackName] = useState(props.track.name);
    const [trackNameValid, setTrackNameValid] = useState(true);
    const [changedTrackPosition, setChangedTrackPosition] = useState(props.track.tourPosition);
    const [trackPositionValid, setTrackPositionValid] = useState(true);
    const filenameRef = useRef<HTMLSpanElement>(null);

    const deleteTrack = () => {
        dispatch(deleteTrackRequest(props.track.id))
            .unwrap()
            .then(() => {
                props.onDataChanged();
                setTimeout(() => props.onDataChanged(), 500);
            })
    }

    const changeTrackName = () => {
        if (props.track.tourId !== 0) {
            dispatch(changeTrackNameRequest({
                trackId: props.track.id,
                name: changedTrackName
            })).unwrap().then(() => props.onDataChanged());
        }
        else {
            props.track.name = changedTrackName;
        }
    }

    const changeTourPosition = () => {
        if (props.track.tourId !== 0) {
            dispatch(changeTrackPositionRequest({
                trackId: props.track.id,
                position: changedTrackPosition
            })).unwrap().then(() => props.onDataChanged());
        }
        else {
            props.track.tourPosition = changedTrackPosition;
        }
    }

    return <tr key={'track' + props.track.id}>
        <td>
            <BaseConfirmModal disableConfirm={!trackNameValid} onConfirm={changeTrackName} 
                buttonContent={<div className="truncate max-w-28 md:max-w-full">{props.track.name}</div>}>
                <div>
                    <div>Change Track Name</div>
                    <ValidatingInput inputType='text' name='Track Name' onChange={setChangedTrackName}
                        minLength={3} maxLength={100} value={props.track.name} validCallback={setTrackNameValid} />
                </div>
            </BaseConfirmModal>
        </td>
        <td>
            <BaseConfirmModal disableConfirm={!trackPositionValid} onConfirm={changeTourPosition} buttonContent={<>{props.track.tourPosition}</>}>
                <div>
                    <div>Change Track Position</div>
                    <ValidatingNumberInput name='Tour Position' onChange={setChangedTrackPosition} min={0} max={10_000}
                        value={props.track.tourPosition} validCallback={setTrackPositionValid}/>
                </div>
            </BaseConfirmModal>
        </td>
        <td className="truncate max-w-11">
            <span ref={filenameRef} onClick={() => setFileNameOpen(!fileNameOpen)}>
                {props.track.data === '' ? 'no data' : props.track.data}
            </span>
            <Popover anchorEl={filenameRef.current}
                open={fileNameOpen} onClose={() => setFileNameOpen(false)}>
                <div className="p-2">
                    {props.track.data}
                </div>
            </Popover>
        </td>
        <td>
            <ConfirmModal type='warning' message={`Confirm deletion of track ${props.track.name}`}
                buttonContent={<>
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="hidden md:block">&nbsp;Delete</span>
                </>} onConfirm={deleteTrack} />
        </td>
    </tr>
}