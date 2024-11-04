import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import { ApiUrls } from "../../constants/ApiUrls";

export type ImageSwipeContainerProps = {
    images: string[];
}

export const ImageSwipeContainer: FunctionComponent<ImageSwipeContainerProps> = (props) => {
    const [index, setIndex] = useState(0);
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

    return <KeyboardSwipeable index={index} enableMouseEvents onChangeIndex={(index) => setIndex(index)}>
        {
            props.images.map(i =>
                <div key={i}>
                    {
                        index > 0 ?
                        <div className="absolute top-0 h-full flex flex-col justify-center">
                            <Button onClick={previousImage} sx={{color:'white', minWidth: '20px'}}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Button>
                        </div>
                        : <></>
                    }
                    {
                        index < imageCount - 1 ?
                        <div className="absolute top-0 right-0 h-full flex flex-col justify-center">
                            <Button onClick={nextImage} sx={{color:'white', minWidth: '20px'}}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Button>
                        </div>
                        : <></>
                    }

                    <img key={i} className="w-full" src={`${ApiUrls.BaseUrl}/img/${i}.jpg`} alt={i} />
                </div>
            )
        }
    </KeyboardSwipeable>
}