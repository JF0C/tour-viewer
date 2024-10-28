import { TextField } from "@mui/material"
import { FunctionComponent, useState } from "react"

export type ValidatingTextFieldProps = {
    name: string
    rows: number
    value?: string
    onChange?: (value: string) => void
    minLength?: number
    maxLength?: number
    customValidator?: (value: string) => string | null
    validCallback?: (valid: boolean) => void
}

export const ValidatingTextField: FunctionComponent<ValidatingTextFieldProps> = (props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const validate = (value: string) => {
        props.onChange?.(value);
        const validationMinLength = props.minLength ?? 0;
        if (props.maxLength) {
            if (value.length < validationMinLength || value.length > props.maxLength) {
                setErrorMessage(`Length of ${props.name} must be in range [${validationMinLength}, ${props.maxLength}]`);
                props.validCallback?.(false);
                return;
            }
        }
        else {
            if (value.length < validationMinLength) {
                setErrorMessage(`${props.name} must be at least ${validationMinLength} long`);
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
        <TextField rows={props.rows} multiline label={props.name} 
            defaultValue={props.value} sx={{fontSize: '16px'}} 
            onChange={(e) => validate(e.target.value)} />
        <div className="text-xs" style={{color: 'red'}}>{ errorMessage }</div>
    </div>
}