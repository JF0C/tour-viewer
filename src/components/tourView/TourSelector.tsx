import { FunctionComponent, useState } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourList } from "./TourList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { clearTracks } from "../../store/trackStateReducer";

export type TourSelectorProps = {
    onSelected: () => void;
}

export const TourSelector: FunctionComponent<TourSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            hideCancel confirmText={'Cancel'} 
            buttonContent={<div>
                <FontAwesomeIcon icon={faList}/>
                &nbsp;Select Tour
            </div>} buttonClass="">
            <TourList onSelected={() => {
                props.onSelected();
                dispatch(clearTracks());
                setOpen(false);
            }} />
        </BaseConfirmModal>
}