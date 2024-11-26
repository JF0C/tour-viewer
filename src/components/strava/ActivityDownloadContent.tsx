import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { millisToDateString } from "../../converters/dateConverters";
import { TrackDownloadItem } from "../../data/trackDownloadItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeTourToDownload, renameStravaActivity } from "../../store/stravaStateReducer";
import { EditableNameLabel } from "../shared/EditableNameLabel";

export type ActivityDownloadContentProps = {
    track: TrackDownloadItem
}

export const ActivityDownloadContent: FunctionComponent<ActivityDownloadContentProps> = (props) => {
    const dispatch = useAppDispatch();
    const tracksToDownload = useAppSelector((state) => state.strava.tracksToDownload);
    const trackState = tracksToDownload.find(t => t.id === props.track.id)?.state;

    const changeName = (activityId: string, name: string) => {
        dispatch(renameStravaActivity({
            id: activityId,
            name: name
        }));
    }

    const removeTrack = (id: string) => {
        dispatch(removeTourToDownload(id));
    }

    if (trackState !== 'ready') {
        return <>{trackState}</>
    }

    return <div>
        <EditableNameLabel onApply={n => changeName(props.track.id, n)} 
            value={props.track.name} inputType="text" name="Track Name" />
        <div>{millisToDateString(props.track.date)}</div>
        <Button onClick={() => removeTrack(props.track.id)} color='error'>
            <FontAwesomeIcon icon={faTrash} />
        </Button>
    </div>
}