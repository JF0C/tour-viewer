import { FunctionComponent, useState } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourList } from "./TourList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { clearTracks } from "../../store/trackStateReducer";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { useSelectedTourId } from "../../hooks/selectedTourHook";

export type TourSelectorProps = {
    onSelected: () => void;
    title: string;
    showIcon?: boolean;
}

export const TourSelector: FunctionComponent<TourSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [, setSelectedTourId] = useSelectedTourId();

    const deselectTour = () => {
        setSelectedTourId(null);
    }

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            cancelText='Show All' onCancel={deselectTour}
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