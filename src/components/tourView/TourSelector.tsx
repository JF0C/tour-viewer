import { FunctionComponent, useState } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourList } from "./TourList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { clearTracks } from "../../store/trackStateReducer";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";

export type TourSelectorProps = {
    onSelected: () => void;
    title: string;
    showIcon?: boolean;
}

export const TourSelector: FunctionComponent<TourSelectorProps> = (props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            hideCancel confirmText='Cancel'
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