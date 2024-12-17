import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { cleanup } from "@testing-library/react";
import { FunctionComponent } from "react";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { CleanupView } from "./cleanupView";
import { useAppDispatch } from "../../store/store";
import { cleanupImagesAndTracks } from "../../store/systemThunk";

export const CleanupButton: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const dryRunCleanup = () => {
        dispatch(cleanupImagesAndTracks(true));
    }

    const cleanup = () => {
        dispatch(cleanupImagesAndTracks(false));
    }

    return <BaseConfirmModal onOpen={dryRunCleanup} onConfirm={cleanup} confirmType='warning'
        confirmText={'Cleanup'}
        buttonContent={<><FontAwesomeIcon icon={faBroom} />&nbsp;Cleanup Images and Tracks</>}>
            <CleanupView />
    </BaseConfirmModal>
}