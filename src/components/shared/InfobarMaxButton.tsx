import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "@mui/material";
import { setInfoBarFull } from "../../store/tourStateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

export const InfobarMaxButton : FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const infoBarFull = useAppSelector((state) => state.tour.infoBarFull);

    if (window.innerWidth > 768) {
        return <></>
    }

    const toggleInfoBarFull = () => {
        dispatch(setInfoBarFull(!infoBarFull));
    }

    return <div>
        <Button onClick={toggleInfoBarFull}>
            {
                infoBarFull 
                ? <FontAwesomeIcon icon={faCompress}/>
                : <FontAwesomeIcon icon={faExpand} />
            }
        </Button>
    </div>
}