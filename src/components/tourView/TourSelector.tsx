import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faList, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useSelectedTourId } from "../../hooks/selectedTourHook";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { useAppDispatch } from "../../store/store";
import { resetSelectedTour, setSelectedTourId } from "../../store/tourStateReducer";
import { clearTracks } from "../../store/trackStateReducer";
import { setMapMode } from "../../store/viewStateReducer";
import { ModalBaseLayout } from "../shared/ModalBaseLayout";
import { TourList } from "./TourList";

export type TourSelectorProps = {
    onSelected?: () => void;
    title: string;
    showIcon?: boolean;
    buttonClass?: string;
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
    const showBlogPosts = () => {
        setOpen(false);
        dispatch(setMapMode('blogPosts'));
    }

    return <>
        <div className={`cursor-pointer ${props.buttonClass}`} onClick={() => setOpen(true)}>
            {
                props.showIcon ?
                    <span>
                        <FontAwesomeIcon icon={faList} /> &nbsp;
                    </span>
                    : <></>
            }
            {props.title}
        </div>
        <ModalBaseLayout open={open} openChange={setOpen} bottomRow={
            <div className="w-full flex flex-row justify-between">
                <Button onClick={showAllTours}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    &nbsp;Search
                </Button>
                <Button onClick={showBlogPosts}>
                    <FontAwesomeIcon icon={faComment}/>
                    &nbsp;Blog Posts
                </Button>
                <Button onClick={() => setOpen(false)}>
                    <FontAwesomeIcon icon={faXmark}/>
                    &nbsp;Close
                </Button>
            </div>
        }>
            <div className="flex flex-row w-80">
                <TourList onSelected={() => {
                    props.onSelected?.();
                    dispatch(clearTracks());
                    dispatch(setEditingBlogpost(undefined))
                    setOpen(false);
                }} />

            </div>
        </ModalBaseLayout>
    </>
}