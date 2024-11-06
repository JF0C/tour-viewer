import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createTrackRequest } from "../../store/trackThunk";
import { ValidatingFileInput } from "../shared/ValidatingFileInput";
import { ValidatingInput } from "../shared/ValidatingInput";
import { ValidatingNumberInput } from "../shared/ValidatingNumberInput";

export type NewTrackItemProps = {
    onDataChanged: () => void,
    initialPosition?: number,
    tourId: number
}

export const NewTrackItem: FunctionComponent<NewTrackItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const [trackName, setTrackName] = useState('');
    const [trackNameValid, setTrackNameValid] = useState(false);
    const [tourPosition, setTourPosition] = useState(props.initialPosition ?? 0);
    const [tourPositionValid, setTourPositionValid] = useState(true);
    const [fileData, setFileData] = useState('')
    const [fileValid, setFileValid] = useState(false)

    const onFileSelected = (fileName: string, data: string) => {
        if (trackName === '') {
        }
        setFileData(data);
    }

    const createTrack = () => {
        dispatch(createTrackRequest({
            id: 0,
            tourId: props.tourId,
            name: trackName,
            tourPosition: tourPosition,
            data: fileData
        }))
            .unwrap()
            .then(() => {
                props.onDataChanged();
                setTimeout(() => props.onDataChanged(), 100);
            })
    }

    return <tr>
        <td>
            <ValidatingInput inputType='text' name='Trackname' minLength={3} maxLength={100}
                onChange={v => setTrackName(v)} validCallback={v => setTrackNameValid(v)} />
        </td>
        <td>
            <ValidatingNumberInput name='Tour Position' min={0} max={10_000} value={props.initialPosition}
                onChange={p => setTourPosition(p)} validCallback={v => setTourPositionValid(v)} />
        </td>
        <td>
            <ValidatingFileInput onFileSelected={onFileSelected} validCallback={v => setFileValid(v)} />
        </td>
        <td>
            <Button disabled={!trackNameValid || !tourPositionValid || !fileValid}
                color='success' onClick={createTrack} variant="outlined">
                <FontAwesomeIcon icon={faCheck} />
                <span className="hidden md:block">&nbsp;Create</span>
            </Button>
        </td>
    </tr>
}