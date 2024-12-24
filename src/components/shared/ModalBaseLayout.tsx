import { Modal } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

export type ModalBaseLayoutProps = {
    open: boolean
    openChange: (open: boolean) => void
    children?: ReactNode
    bottomRow?: ReactNode
}

export const ModalBaseLayout: FunctionComponent<ModalBaseLayoutProps> = (props) => {
    const onBackgroundClick = (e: any) => {
        if (e.target.id === 'modal-background') {
            props.openChange(false);
        }
    }

    return <Modal open={props.open} onClose={() => props.openChange(false)}>
        <div id="modal-background" onClick={onBackgroundClick} className="flex flex-col items-center justify-center h-full">
            <div className="base-modal flex flex-col justify-center border border-solid rounded-lg text-white p-4 max-w-96">
                <div>
                    {props.children}
                </div>
                <div className="flex flex-row w-full">
                    {props.bottomRow}
                </div>
            </div>
        </div>
    </Modal>
}