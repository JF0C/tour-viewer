import { Modal } from "@mui/material";
import { FunctionComponent } from "react";
import { setFullSizeImages } from "../../store/blogPostStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "../blogPost/ImageSwipeContainer";

export const FullSizeImageView: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.fullSizeImages);

    const closeFullSizeImages = () => {
        dispatch(setFullSizeImages([]));
    }

    return <Modal className="px-4 md:px-14 flex justify-center items-center" 
        open={images.length > 0} onClose={closeFullSizeImages}>
        <div className="shrink flex flex-row w-full">
            <ImageSwipeContainer images={images} rounded />
        </div>
    </Modal>
}