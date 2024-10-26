import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { setTracks } from "../../store/tourStateReducer";
import { TrackItem } from "./MenuGroup";

export type TourLinkProps = {
    tracks: TrackItem[];
    displayName: string;
}

export const TourLink: FunctionComponent<TourLinkProps> = (props) => {
    const dispatch = useAppDispatch();

    const set = () => {
        dispatch(setTracks(props.tracks.map(t => t.id)))
    }

    return <Button id={props.displayName} onClick={set}>
        {props.displayName}
    </Button>
}