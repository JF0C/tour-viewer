import { Button, Modal } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";

export type BaseModalProps = {
    children?: ReactElement | string;
    buttonContent: ReactElement;
    confirmType?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    confirmText?: ReactElement | string;
    cancelType?: 'inherit' | 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning';
    cancelText?: ReactElement | string;
    onConfirm: () => void;
    disableConfirm?: boolean;
    onOpen?: () => void;
}

export const BaseModal: FunctionComponent<BaseModalProps> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    return <>
        <Button color={props.confirmType} onClick={() => { props.onOpen?.(); setModalOpen(true); }}>
            {props.buttonContent}
        </Button>
        <Modal open={modalOpen}>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="base-modal flex flex-col justify-center border border-solid rounded-lg text-white p-4">
                    <div className="flex flex-row flex-wrap max-w-80">
                        {props.children}
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <Button color={props.cancelType ?? 'primary'} onClick={() => setModalOpen(false) }>{props.cancelText ?? 'Cancel'}</Button>
                        <Button disabled={props.disableConfirm} color={props.confirmType ?? 'primary'} onClick={
                            () => { setModalOpen(false); props.onConfirm();}}>
                            {props.confirmText ?? 'Confirm'}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    </>
}