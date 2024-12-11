import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { setInfoBarLarge } from "../../store/viewStateReducer";

export const InfobarMaxButton : FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const infobarLarge = useAppSelector((state) => state.view.infobarLarge);

    if (window.innerWidth > 768) {
        return <></>
    }

    const toggleInfoBarFull = () => {
        dispatch(setInfoBarLarge(!infobarLarge));
    }

    return <div>
        <Button onClick={toggleInfoBarFull}>
            {
                infobarLarge 
                ? <FontAwesomeIcon icon={faCompress}/>
                : <FontAwesomeIcon icon={faExpand} />
            }
        </Button>
    </div>
}