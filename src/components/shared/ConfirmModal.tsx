import { FunctionComponent, ReactElement } from "react";
import { BaseConfirmModal } from "./BaseConfirmModal";

export type ConfirmModalProps = {
    message: string;
    type: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    onConfirm: () => void;
    buttonContent: ReactElement;
    confirmText?: string;
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = (props) => {
    return <BaseConfirmModal confirmType='error' onConfirm={props.onConfirm} 
            buttonContent={props.buttonContent}
            confirmText={props.confirmText ?? 'Delete'}>{props.message}</BaseConfirmModal>
}