import { FunctionComponent } from "react";
import { ImageSwipeContainer } from "../blogPost/ImageSwipeContainer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Modal } from "@mui/material";
import { setFullSizeImages } from "../../store/blogPostStateReducer";

export const FullSizeImageView: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.fullSizeImages);

    const closeFullSizeImages = () => {
        dispatch(setFullSizeImages([]));
    }
    if (images) {
        console.log(images)
    }

    return <Modal className="px-4 md:px-14 flex justify-center items-center" 
        open={images.length > 0} onClose={closeFullSizeImages}>
        <div className="w-96 h-96">
            <ImageSwipeContainer images={images} rounded/>
            
        </div>
    </Modal>
}