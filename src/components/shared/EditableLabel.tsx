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
    buttonsAsColumn?: boolean;
}

export const EditableLabel: FunctionComponent<EditableLabelProps> = (props) => {
    const [editing, setEditing] = useState(false);

    if (editing) {
        return <div className="flex flex-row gap-2 flex-wrap">
        <div className={`flex-1 ${props.className}`}>
            { props.editor }
        </div>
        <div className={`flex ${props.buttonsAsColumn ? 'flex-col': 'flex-row'} gap-2 items-center`}>
            <Button sx={{minWidth: '20px'}} color="warning" onClick={() => setEditing(false)}>
                <FontAwesomeIcon icon={faX} />
            </Button>
            <Button sx={{minWidth: '20px'}} disabled={!props.canConfirm} color="success" onClick={() => { props.onApplyChange(); setEditing(false) }}>
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    </div>
    }
    else {
        return <div className="flex flex-row gap-2 flex-wrap items-center">
            <div className={`${props.className}`}>
                { props.label }
            </div>
            <div>
                <Button sx={{minWidth: '20px'}} onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
        </div>
    }
}