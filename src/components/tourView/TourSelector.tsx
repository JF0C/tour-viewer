import { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { TourList } from "./TourList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";


export const TourSelector: FunctionComponent = () => {
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const [open, setOpen] = useState(false);

    return <BaseConfirmModal onConfirm={() => setOpen(false)} 
            onOpen={() => setOpen(true)} open={open} 
            hideCancel confirmText={'Cancel'} 
            buttonContent={<>
                <FontAwesomeIcon icon={faList}/>
                &nbsp;
                {`${tour?.name ?? 'Select Tour'}`}
            </>} buttonClass="">
            <TourList onSelected={() => setOpen(false)} />
        </BaseConfirmModal>
}