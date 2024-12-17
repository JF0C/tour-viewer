import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../store/store";
import { cleanupImagesAndTracks } from "../../store/systemThunk";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { CleanupView } from "./cleanupView";

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