import { Button } from "@mui/material"
import { FunctionComponent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { showInfobar } from "../../store/tourStateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InfoBarHandle: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const infoOpen = useAppSelector((state) => state.tour.showInfoBar);
    const hideHandle = infoOpen ? 'hide' : '';

    return <div id='info-bar-handle' className={`absolute bottom-0 md:right-0 p-2 w-full md:w-auto md:h-full flex flex-row md:flex-col justify-center ${hideHandle}`}>
        <div style={{ zIndex: 1000 }} className="selector-field rounded-md border-black">
            <Button sx={{ minWidth: '25px' }} onClick={() => dispatch(showInfobar(!infoOpen))}>
                <FontAwesomeIcon icon={faInfoCircle} />
            </Button>
        </div>
    </div>
}