import { FunctionComponent } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { tourDataJobRequest } from "../../store/systemThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";

export const AddMissingTourCountries: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return <BaseConfirmModal buttonContent={
            <>
                <FontAwesomeIcon icon={faMap}/>&nbsp;
                Add Missing Tour Countries</>
        }
        onConfirm={() => dispatch(tourDataJobRequest())}
    >
        <div>
            Countries are assigned to tours with no assigned countries.
            GPS data of the tracks is used to detect countries.
        </div>
    </BaseConfirmModal>
}