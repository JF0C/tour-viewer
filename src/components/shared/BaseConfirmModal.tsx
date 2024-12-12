import { Button, Modal } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";
import { ModalBaseLayout } from "./ModalBaseLayout";

export type BaseConfirmModalProps = {
    children?: ReactElement | string;
    buttonContent: ReactElement;
    confirmType?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    confirmText?: ReactElement | string;
    cancelType?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    cancelText?: ReactElement | string;
    hideCancel?: boolean;
    buttonClass?: string;
    closeOnSelection?: boolean;
    open?: boolean;
    onConfirm: () => void;
    disableConfirm?: boolean;
    onOpen?: () => void;
    onCancel?: () => void;
}

export const BaseConfirmModal: FunctionComponent<BaseConfirmModalProps> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const onSelection = () => {
        if (props.closeOnSelection) {
            setModalOpen(false);
        }
    }

    var modalOpenExt = modalOpen;
    if (props.open !== undefined) {
        modalOpenExt = props.open;
    }

    return <>
        <div className={props.buttonClass}>
            <Button color={props.confirmType} onClick={() => { props.onOpen?.(); setModalOpen(true); }}>
                {props.buttonContent}
            </Button>
        </div>
        <ModalBaseLayout open={modalOpenExt} openChange={setModalOpen}
            bottomRow={
                <div className={`flex flex-row w-full ${props.hideCancel ? 'justify-center' : 'justify-between'}`}>
                {
                    !props.hideCancel ?
                        <Button color={props.cancelType ?? 'primary'} onClick={() => { props.onCancel?.(); setModalOpen(false); }}>
                            {props.cancelText ?? 'Cancel'}
                        </Button>
                        : <></>
                }
                    <Button disabled={props.disableConfirm} color={props.confirmType ?? 'primary'} onClick={
                        () => { setModalOpen(false); props.onConfirm(); }}>
                        {props.confirmText ?? 'Confirm'}
                    </Button>
                </div>}
        >
            <div onClick={onSelection} className="flex flex-row flex-wrap">
                {props.children}
            </div>
        </ModalBaseLayout>
    </>
}