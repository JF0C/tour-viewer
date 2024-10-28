import { FunctionComponent, useState } from "react";
import { EditableLabel } from "./EditableLabel";
import { ValidatingTextField } from "./ValidatingTextField";

export type EditableTextFieldProps = {
    value: string;
    name: string;
    rows: number;
    onApply: (value: string) => void;
    minLength?: number
    maxLength?: number
    className?: string
}

export const EditableTextField: FunctionComponent<EditableTextFieldProps> = (props) => {
    const [currentValue, setCurrentValue] = useState(props.value)
    const [isValid, setIsValid] = useState(false);

    return <EditableLabel canConfirm={isValid && (props.value !== currentValue)} label={props.value} 
        className={props.className}
        editor={
        <ValidatingTextField rows={props.rows} value={props.value}
            name={props.name} onChange={v => setCurrentValue(v)}
            minLength={props.minLength} maxLength={props.maxLength} 
            validCallback={(v) => setIsValid(v)}/>}
        onApplyChange={() => props.onApply(currentValue)}
        />
}