import { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourSelector } from "./TourSelector";


export const TourView: FunctionComponent = () => {
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const [open, setOpen] = useState(false);

    return <div>
        <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            hideCancel confirmText={'Cancel'} 
            buttonContent={<>{`${tour?.name ?? 'Select Tour'}`}</>} buttonClass="">
            <TourSelector onSelected={() => setOpen(false)} />
        </BaseConfirmModal>
    </div>
}