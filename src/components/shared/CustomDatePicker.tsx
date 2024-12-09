import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FunctionComponent } from "react";

export type CustomDatePickerProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    label: string;
}

export const CustomDatePicker: FunctionComponent<CustomDatePickerProps> = (props) => {
    const disabled = props.value === undefined;
    return <div className="date-picker flex flex-row relative">
        <DatePicker sx={{ padding: 0 }} value={props.value === undefined ? undefined : dayjs(props.value)} label={props.label} format="DD.MM.YYYY" onChange={e => props.onChange?.(e?.toDate())  } />
        <div className="absolute reset-button h-full flex flex-row items-center">
            <Button disabled={disabled} onClick={() => props.onChange?.(undefined)} sx={{ color: 'white', maxWidth: '20px' }}>
                <FontAwesomeIcon icon={faXmarkCircle} />
            </Button>
        </div>
    </div>
}