import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../store/store";
import { setTours } from "../store/tourStateReducer";

export type TourLinkProps = {
    tours: string[];
    displayName: string;
}

export const TourLink: FunctionComponent<TourLinkProps> = (props) => {
    const dispatch = useAppDispatch();

    const set = () => {
        dispatch(setTours(props.tours))
    }

    return <Button id={props.displayName} onClick={set}>
        {props.displayName}
    </Button>
}