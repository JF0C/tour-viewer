import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import { ApiUrls } from "../../constants/ApiUrls";
import { useAppDispatch } from "../../store/store";
import { setFullSizeImages } from "../../store/blogPostStateReducer";

export type ImageSwipeContainerProps = {
    images: string[];
    allowFullSizeView?: boolean;
    rounded?: boolean;
}

export const ImageSwipeContainer: FunctionComponent<ImageSwipeContainerProps> = (props) => {
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0);
    const [imageClicked, setImageClicked] = useState(false);
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

    const showFullSize = () => {
        if (!props.allowFullSizeView) {
            return;
        }
        dispatch(setFullSizeImages(props.images));
    }

    const containerClicked = () => {
        console.log(imageClicked)
    }

    return <KeyboardSwipeable index={index} enableMouseEvents onChangeIndex={(index) => setIndex(index)}>
        {
            props.images.map(i =>
                <div key={i} className="h-full flex flex-col justify-center" onClick={containerClicked}>
                    <img key={i} style={{ pointerEvents: 'none' }} onClick={() => setImageClicked(true)}
                        className={`swipe-container-image w-full ${props.rounded ? 'rounded-lg' : ''}`}
                        src={`${ApiUrls.BaseUrl}/img/${i}.jpg`} alt={i} />

                    <div className="absolute top-0 h-full w-full">{
                        index > 0 ?
                            <div className="absolute top-0 h-full flex flex-col justify-center">
                                <Button onClick={previousImage} sx={{ color: 'white', minWidth: '20px' }}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </Button>
                            </div>
                            : <></>
                    }
                        {
                            props.allowFullSizeView ?
                                <div className="absolute top-0 w-full h-full flex justify-center items-center">
                                    <Button onClick={showFullSize} className="mx-8 border border-white h-full w-full">


                                    </Button>
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