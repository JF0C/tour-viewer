import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { Participant } from "./Participant";
import { Roles } from "../../constants/Rolenames";
import { BaseConfirmModal } from "../shared/BaseConfirmModal";
import { ParticipantSelector } from "./ParticipantSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TourParticipants: FunctionComponent = () => {
    const user = useAppSelector((state) => state.auth.user);
    const tour = useAppSelector((state) => state.tour.editingTour);
    const canEdit = user?.roles.includes(Roles.Contributor) ?? false;

    return <div className="flex flex-row flex-wrap p-2 gap-2">
        {tour.participants.map(p => <Participant key={'participant' + p.id} user={p} canRemove={canEdit} />)}
        {
            canEdit ?
            <BaseConfirmModal hideCancel confirmText={'Ok'} onConfirm={()=>{}} 
                buttonContent={<><FontAwesomeIcon icon={faPlus}/>Add</>} buttonClass="border rounded-full border-dashed">
                <ParticipantSelector />
            </BaseConfirmModal>
            : <></>
        }
    </div>
}