import { Input } from "@mui/material"
import { FunctionComponent, useState } from "react"

export type ValidatingNumberInputProps = {
    name: string
    value?: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    customValidator?: (value: number) => string | null
    validCallback?: (valid: boolean) => void
    width?: number
}

export const ValidatingNumberInput: FunctionComponent<ValidatingNumberInputProps> = (props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const validate = (value: number) => {
        props.onChange?.(value);
        const validationMin = props.min ?? 0;
        if (props.max) {
            if (value < validationMin || value > props.max) {
                setErrorMessage(`${props.name} must be in range [${validationMin}, ${props.max}]`);
                props.validCallback?.(false);
                return;
            }
        }
        else {
            if (value < validationMin) {
                setErrorMessage(`${props.name} must be at least ${validationMin}`);
                props.validCallback?.(false);
                return;
            }
        }
        if (props.customValidator) {
            const customErrorMessage = props.customValidator(value);
            setErrorMessage(customErrorMessage);
            if (customErrorMessage) {
                props.validCallback?.(false);
                return;
            }
        }
        setErrorMessage(null);
        props.validCallback?.(true);
    }

    return <div className="flex flex-col">
        <Input sx={{fontSize: '16px', width: props.width ?? '80px'}} defaultValue={props.value} onChange={(e) => validate(Number(e.target.value))} type='number' />
        <div className="text-xs" style={{color: 'red'}}>{ errorMessage }</div>
    </div>
}