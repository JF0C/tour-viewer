import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FunctionComponent, useState } from "react";

export type ValidatingDatePickerProps = {
    value: number;
    onChange: (ticks: number) => void;
    validCallback: (isValid: boolean) => void;
}

export const ValidatingDatePicker: FunctionComponent<ValidatingDatePickerProps> = (props) => {

    const [valid, setValid] = useState(false)
    const [initialized, setInitialized] = useState(false)

    const validateDate = (ticks: number) => {
        const date = ticks;
        const fromDate = Date.now() - 1000 * 60 * 60 * 24 * 365 * 10;
        const toDate = Date.now() + 1000 * 60 * 60 * 24 * 365;
        return fromDate < date && date < toDate
    }

    const onDateInput = (ticks: number) => {
        props.onChange(ticks);
        const validationResult = validateDate(ticks);
        setValid(validationResult);
        props.validCallback(validationResult);
    }
    if (!initialized) {
        setInitialized(true);
        const isValid = validateDate(props.value);
        setValid(isValid);
        props.validCallback(isValid);
    }

    return <div>
        <DatePicker defaultValue={dayjs(new Date(props.value))} format="DD.MM.YYYY" onChange={e => { onDateInput(e?.toDate().valueOf() ?? 0) }} />
        <div className="text-xs" style={{ color: 'red' }}>{valid ? '' : 'Date must be bigger than 10 years ago and smaller than 1 year in the future'}</div>
    </div>
}