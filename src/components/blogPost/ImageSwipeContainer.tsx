import { faChevronLeft, faChevronRight, faImage, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import { ApiUrls } from "../../constants/ApiUrls";
import { useAppDispatch } from "../../store/store";
import { setFullSizeImages } from "../../store/blogPostStateReducer";
import { ConfirmModal } from "../shared/ConfirmModal";

export type ImageSwipeContainerProps = {
    images: string[];
    selectedImage?: string;
    allowFullSizeView?: boolean;
    rounded?: boolean;
    onDelete?: (imageId: string) => void;
    onClose?: () => void;
}

export const ImageSwipeContainer: FunctionComponent<ImageSwipeContainerProps> = (props) => {
    const dispatch = useAppDispatch();

    var initialIndex = 0;
    if (props.selectedImage) {
        initialIndex = props.images.indexOf(props.selectedImage);
        console.log('initial image: ' + props.selectedImage);
    }

    const [index, setIndex] = useState(initialIndex);
    const KeyboardSwipeable = bindKeyboard(SwipeableViews);
    const imageCount = props.images.length;
    if (imageCount === 0) {
        return <></>
    }

    const previousImage = (e: any) => {
        e.preventDefault();
        setIndex(index - 1);
    }
    const nextImage = (e: any) => {
        e.preventDefault();
        setIndex(index + 1);
    }

    const showFullSize = (selectedImage: string) => {
        if (!props.allowFullSizeView) {
            return;
        }
        dispatch(setFullSizeImages({
            items: props.images,
            selectedItem: selectedImage
        }));
    }

    return <KeyboardSwipeable index={index} enableMouseEvents resistance
        onChangeIndex={(index) => setIndex(index)}>
        {
            props.images.map(i =>
                <div key={i} className="h-full flex flex-col justify-center items-center">
                    <img key={i} style={{ pointerEvents: 'none' }}
                        className={`swipe-container-image full-size-image ${props.rounded ? 'rounded-lg' : ''}`}
                        src={`${ApiUrls.BaseUrl}/img/${i}.jpg`} alt={i} />

                    <div className={`absolute top-0 h-full w-full`}>
                        {
                            props.onClose ? 
                            <div className="absolute top-0 right-0">
                                <Button onClick={() => props.onClose?.()} color='error'>
                                    <FontAwesomeIcon icon={faX} />
                                </Button>
                            </div>
                            :<></>
                        }
                        {
                            props.allowFullSizeView ?
                                <div className="absolute top-0 w-full h-full flex justify-center items-center">
                                    <div onClick={() => showFullSize(i)} className="group mx-8 h-full w-full cursor-pointer
                                        pointer-cursor flex justify-center items-center">
                                        <FontAwesomeIcon className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out" icon={faImage} />
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            index > 0 ?
                                <div className="absolute top-0 h-full flex flex-col justify-center">
                                    <Button onClick={previousImage} sx={{ color: 'white', minWidth: '20px' }}>
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </Button>
                                </div>
                                : <></>
                        }
                        {
                            props.onDelete ?
                                <div className="absolute bottom-0 w-full h-12 flex">
                                    <div className="mx-8 h-full w-full flex justify-center items-center">
                                        <ConfirmModal buttonContent={<FontAwesomeIcon icon={faTrash} />}
                                            onConfirm={() => props.onDelete?.(i)}
                                            type='error'
                                            message="Do you really want to delete this image?"
                                        />
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            index < (imageCount - 1) ?
                                <div className="absolute top-0 right-0 h-full flex flex-col justify-center">
                                    <Button onClick={nextImage} sx={{ color: 'white', minWidth: '20px' }}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </Button>
                                </div>
                                : <></>
                        }
                    </div>
                </div>
            )
        }
    </KeyboardSwipeable>
}