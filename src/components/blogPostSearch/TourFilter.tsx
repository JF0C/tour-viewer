import { FunctionComponent, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setBlogPostSearchFilter } from "../../store/blogPostStateReducer";
import { TourListBase } from "../tourView/TourListBase";

export const TourFilter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tours = useAppSelector((state) => state.tour.tours);
    const blogPostState = useAppSelector((state) => state.blog);
    const [open, setOpen] = useState(false);

    const onBackgroundClick = (e: any) => {
        if (e.target.id === 'modal-background') {
            setOpen(false);
        }
    }

    const setTourFilter = (id: number | undefined, name: string | undefined) => {
        setOpen(false);
        dispatch(setBlogPostSearchFilter({
            ...blogPostState.filter,
            tour: id,
            tourName: name
        }))
    }

    return <>
        <TextField sx={{ width: '100px' }} label="Tour" size="small" className="no-input-text-field"
            value={blogPostState.filter.tourName ?? 'All'} onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)}>
            <div id="modal-background" onClick={onBackgroundClick} className="flex flex-col items-center justify-center h-full">
                <div className="base-modal flex flex-col justify-center border border-solid rounded-lg text-white p-4">
                    <div className="flex flex-row flex-wrap max-w-80">
                        <TourListBase>
                            {
                                tours.map(t => <Button key={t.id} onClick={() => setTourFilter(t.id, t.name)}>
                                    {t.name}
                                </Button>)
                            }
                        </TourListBase>
                    </div>
                    <div className="flex flex-row justify-between">
                        <Button onClick={() => setTourFilter(undefined, undefined)}>All</Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal></>
}