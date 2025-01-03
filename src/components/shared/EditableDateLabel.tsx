import { FunctionComponent, useState } from "react";
import { EditableLabel } from "./EditableLabel";
import { ValidatingDatePicker } from "./ValidatingDatePicker";
import { millisToDateString } from "../../converters/dateConverters";

export type EditableDateLabelProps = {
    value: number;
    label: string;
    onApply: (value: number) => void;
}

export const EditableDateLabel: FunctionComponent<EditableDateLabelProps> = (props) => {
    const [currentValue, setCurrentValue] = useState(props.value)
    const [isValid, setIsValid] = useState(false);

    return <EditableLabel canConfirm={isValid && (props.value !== currentValue)} className="flex-none"
        label={millisToDateString(props.value)} editor={
        <ValidatingDatePicker label={props.label} validCallback={v => setIsValid(v)} 
        value={props.value} onChange={v => setCurrentValue(v)} />} 
        onApplyChange={() => props.onApply(currentValue)}
        />
}