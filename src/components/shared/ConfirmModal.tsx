import { FunctionComponent, ReactElement } from "react";
import { BaseConfirmModal } from "./BaseConfirmModal";

export type ConfirmModalProps = {
    message: string;
    type: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    onConfirm: () => void;
    buttonContent: ReactElement;
    outlinedButton?: boolean;
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = (props) => {
    return <BaseConfirmModal confirmType='error' onConfirm={props.onConfirm} 
            buttonContent={props.buttonContent} outlinedButton
            confirmText="Delete">{props.message}</BaseConfirmModal>
}