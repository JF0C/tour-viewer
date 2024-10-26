import { FunctionComponent, useState } from "react";
import { EditableLabel } from "./EditableLabel";
import { ValidatingInput } from "./ValidatingInput";

export type EditableNameLabelProps = {
    value: string;
    name: string;
    inputType: 'text' | 'password';
    onApply: (value: string) => void;
    minLength?: number
    maxLength?: number
}

export const EditableNameLabel: FunctionComponent<EditableNameLabelProps> = (props) => {
    const [currentValue, setCurrentValue] = useState(props.value)
    const [isValid, setIsValid] = useState(false);

    return <EditableLabel canConfirm={isValid && (props.value !== currentValue)} label={props.value} editor={
        <ValidatingInput inputType={props.inputType} value={props.value}
            name={props.name} onChange={v => setCurrentValue(v)}
            minLength={props.minLength} maxLength={props.maxLength} 
            validCallback={(v) => setIsValid(v)}/>} 
        onApplyChange={() => props.onApply(currentValue)}
        />
}