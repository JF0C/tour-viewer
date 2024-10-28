import { faCheck, faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";

export type EditableLabelProps = {
    label: ReactNode;
    editor: ReactNode;
    onApplyChange: () => void;
    canConfirm: boolean;
    className?: string;
}

export const EditableLabel: FunctionComponent<EditableLabelProps> = (props) => {
    const [editing, setEditing] = useState(false);

    if (editing) {
        return <div className="flex flex-row gap-2 flex-wrap">
        <div className={`flex-1 ${props.className}`}>
            { props.editor }
        </div>
        <div className="flex flex-row gap-2">
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
        return <div className="flex flex-row gap-2 flex-wrap">
            <div className={`flex-1 ${props.className}`}>
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