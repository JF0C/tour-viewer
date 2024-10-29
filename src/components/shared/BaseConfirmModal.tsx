import { Button, Modal } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";

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
    outlinedButton?: boolean;
    open?: boolean;
    onConfirm: () => void;
    disableConfirm?: boolean;
    onOpen?: () => void;
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
            <Button color={props.confirmType} variant={props.outlinedButton ? 'outlined' : 'text'} onClick={() => { props.onOpen?.(); setModalOpen(true); }}>
                {props.buttonContent}
            </Button>
        </div>
        <Modal open={modalOpenExt} onClose={() => (setModalOpen(false))}>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="base-modal flex flex-col justify-center border border-solid rounded-lg text-white p-4">
                    <div onClick={onSelection} className="flex flex-row flex-wrap max-w-80">
                        {props.children}
                    </div>
                    <div className={`flex flex-row items-center ${props.hideCancel ? 'justify-center' : 'justify-between'}`}>
                        {
                            !props.hideCancel ?
                                <Button color={props.cancelType ?? 'primary'} onClick={() => setModalOpen(false)}>
                                    {props.cancelText ?? 'Cancel'}
                                </Button>
                                : <></>
                        }
                        <Button disabled={props.disableConfirm} color={props.confirmType ?? 'primary'} onClick={
                            () => { setModalOpen(false); props.onConfirm(); }}>
                            {props.confirmText ?? 'Confirm'}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    </>
}