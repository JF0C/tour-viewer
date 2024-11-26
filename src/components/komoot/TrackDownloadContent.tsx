import { FunctionComponent } from "react";
import { GpxTourDownload } from "../../data/gpxTourDownload";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { millisToDateString } from "../../converters/dateConverters";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { useAppDispatch } from "../../store/store";
import { changeKomootTourName, removeSelectedKomootTour } from "../../store/komootStateReducer";

export type TrackDownloadContentProps = {
    tour: GpxTourDownload
}

export const TrackDownloadContent: FunctionComponent<TrackDownloadContentProps> = (props) => {
    const dispatch = useAppDispatch();

    const changeName = (id: string, name: string) => {
        dispatch(changeKomootTourName({id: id, name: name}));
    }

    const removeTour = (id: string) => {
        dispatch(removeSelectedKomootTour(id));
    }

    return <>
        <EditableNameLabel onApply={n => changeName(props.tour.id, n)} value={props.tour.name} inputType="text" name="Tour Name" />
        {/* <div>{(t.distance / 1000).toFixed(2)}km</div> */}
        <div>{millisToDateString(props.tour.date)}</div>
        <Button onClick={() => removeTour(props.tour.id)} color='error'>
            <FontAwesomeIcon icon={faTrash} />
        </Button>
    </>
}