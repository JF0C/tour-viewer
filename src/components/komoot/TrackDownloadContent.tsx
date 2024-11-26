import { FunctionComponent } from "react";
import { TrackDownloadItem } from "../../data/trackDownloadItem";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { millisToDateString } from "../../converters/dateConverters";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeKomootTourName, removeSelectedKomootTour } from "../../store/komootStateReducer";

export type TrackDownloadContentProps = {
    track: TrackDownloadItem
}

export const TrackDownloadContent: FunctionComponent<TrackDownloadContentProps> = (props) => {
    const dispatch = useAppDispatch();
    const trackState = useAppSelector((state) => state.komoot.toursToDownload.find(t => t.id === props.track.id)?.state);

    const changeName = (id: string, name: string) => {
        dispatch(changeKomootTourName({id: id, name: name}));
    }

    const removeTrack = (id: string) => {
        dispatch(removeSelectedKomootTour(id));
    }

    if (trackState !== 'ready') {
        return <>{trackState}</>
    }

    return <>
        <EditableNameLabel onApply={n => changeName(props.track.id, n)} value={props.track.name} inputType="text" name="Track Name" />
        {/* <div>{(t.distance / 1000).toFixed(2)}km</div> */}
        <div>{millisToDateString(props.track.date)}</div>
        <Button onClick={() => removeTrack(props.track.id)} color='error'>
            <FontAwesomeIcon icon={faTrash} />
        </Button>
    </>
}