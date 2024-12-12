import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import { useSelectedTourId } from "../../hooks/selectedTourHook";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { useAppDispatch } from "../../store/store";
import { resetSelectedTour, setSelectedTourId } from "../../store/tourStateReducer";
import { clearTracks } from "../../store/trackStateReducer";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourList } from "./TourList";

export type TourSelectorProps = {
    onSelected: () => void;
    title: string;
    showIcon?: boolean;
}

export const TourSelector: FunctionComponent<TourSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [, storeSelectedTourId] = useSelectedTourId();

    const showAllTours = () => {
        setOpen(false);
        storeSelectedTourId(null);
        dispatch(setSelectedTourId(0));
        dispatch(resetSelectedTour());
    }

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            cancelText='Show All' onCancel={showAllTours}
            confirmText='Done'
            buttonContent={<div>
                {
                    props.showIcon ? 
                    <span>
                        <FontAwesomeIcon icon={faList}/> &nbsp;
                    </span>
                    : <></>
                }
                {props.title}
            </div>}>
            <TourList onSelected={() => {
                props.onSelected();
                dispatch(clearTracks());
                dispatch(setEditingBlogpost(undefined))
                setOpen(false);
            }} />
        </BaseConfirmModal>
}