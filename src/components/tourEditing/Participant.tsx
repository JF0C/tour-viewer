import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { removeEditingTourParticipant } from "../../store/tourStateReducer";

export type ParticipantProps = {
    name: string,
    id: number,
    canRemove: boolean
}

export const Participant: FunctionComponent<ParticipantProps> = (props) => {
    const dispatch = useAppDispatch();

    const removeParticipant = () => {
        dispatch(removeEditingTourParticipant(props.id))
    }

    return <div className="flex flex-row border rounded-full ps-2 items-center">
        <div>{props.name}</div>
        <Button sx={{ minWidth: 0, minHeight: 0 }} onClick={removeParticipant}>
            <FontAwesomeIcon icon={faX}/>
        </Button>
    </div>
}