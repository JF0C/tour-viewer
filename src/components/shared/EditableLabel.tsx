import { faCheck, faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";

export type EditableLabelProps = {
    label: ReactNode;
    editor: ReactNode;
    onApplyChange: () => void;
    canConfirm: boolean;
}

export const EditableLabel: FunctionComponent<EditableLabelProps> = (props) => {
    const [editing, setEditing] = useState(false);

    console.log('input valid: ' + props.canConfirm);

    if (editing) {
        return <div className="flex flex-row">
        <div className="flex-1">
            { props.editor }
        </div>
        <div>
            <Button color="warning" variant="outlined" onClick={() => setEditing(false)}>
                <FontAwesomeIcon icon={faX} />
            </Button>
            <Button disabled={!props.canConfirm} color="success" variant="outlined" onClick={() => { props.onApplyChange(); setEditing(false) }}>
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    </div>
    }
    else {
        return <div className="flex flex-row">
            <div className="flex-1">
                { props.label }
            </div>
            <div>
                <Button variant="outlined" onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
        </div>
    }
}