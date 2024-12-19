import { Modal } from "@mui/material";
import { FunctionComponent } from "react";
import { setFullSizeImages } from "../../store/blogPostStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "../blogPost/ImageSwipeContainer";

export const FullSizeImageView: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.fullSizeImages);
    const selectedImage = useAppSelector((state) => state.blog.selectedFullSizeImage);

    const closeFullSizeImages = () => {
        dispatch(setFullSizeImages({items: []}));
    }

    return <Modal className="px-4 md:px-14 flex justify-center items-center" 
        open={images.length > 0} onClose={closeFullSizeImages}>
        <div className="flex flex-row w-fit justify-center">
            <ImageSwipeContainer selectedImage={selectedImage} images={images} rounded onClose={closeFullSizeImages} />
        </div>
    </Modal>
}