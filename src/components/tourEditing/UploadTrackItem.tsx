import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { TrackUploadItem } from "../../data/trackUploadItem";
import { useAppDispatch } from "../../store/store";
import { removeTrackToUpload, setTrackToUploadName, setTrackToUploadTourPosition, setTrackToUploadValid } from "../../store/tourStateReducer";
import { ValidatingInput } from "../shared/ValidatingInput";
import { ValidatingNumberInput } from "../shared/ValidatingNumberInput";

export type UploadTrackItemProps = {
    track: TrackUploadItem
}

export const UploadTrackItem: FunctionComponent<UploadTrackItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const [nameValid, setNameValid] = useState(false);
    const [positionValid, setPositionValid] = useState(true);

    const setTrackNameValid = (v: boolean) => {
        dispatch(setTrackToUploadValid({id: props.track.id, valid: positionValid && v}));
        setNameValid(v);
    }

    const setTourPositionValid = (v: boolean) => {
        dispatch(setTrackToUploadValid({id: props.track.id, valid: nameValid && v}));
        setPositionValid(v);
    }

    const setTrackName = (name: string) => {
        dispatch(setTrackToUploadName({id: props.track.id, name: name}));
    }

    const setTourPosition = (position: number) => {
        dispatch(setTrackToUploadTourPosition({id: props.track.id, position: position}));
    }

    const removeTrack = () => {
        dispatch(removeTrackToUpload(props.track.id));
    }

    return <tr>
        <td>
            <ValidatingInput value={props.track.name} inputType='text' name='Trackname' minLength={3} maxLength={100}
                onChange={v => setTrackName(v)} validCallback={v => setTrackNameValid(v)} />
        </td>
        <td>
            <ValidatingNumberInput width={50} name='Tour Position' min={0} max={10_000} value={props.track.tourPosition}
                onChange={p => setTourPosition(p)} validCallback={v => setTourPositionValid(v)} />
        </td>
        <td>
            {props.track.state}
        </td>
        <td>
            <Button color='error' onClick={removeTrack}>
                <FontAwesomeIcon icon={faXmarkCircle}/>
            </Button>
        </td>
    </tr>
}