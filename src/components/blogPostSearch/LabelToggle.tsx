import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

export type LabelToggleProps = {
    label: string
    isSelected?: boolean
    onSelect?: (label: string) => void
    onDeselect?: (label: string) => void
}

export const LabelToggle: FunctionComponent<LabelToggleProps> = (props) => {

    const toggleSelected = () => {
        if (props.isSelected) {
            props.onDeselect?.(props.label);
        } 
        else {
            props.onSelect?.(props.label);
        }
    }

    return <div className="flex flex-row justify-between gap-2 text-lg cursor-pointer"
        onClick={toggleSelected}>
        <div>
            {props.label}
        </div>
        <div>
            {
                props.isSelected ?
                <FontAwesomeIcon icon={faCheckSquare}/>
                :
                <FontAwesomeIcon icon={faSquare}/>
            }
        </div>
    </div>
}