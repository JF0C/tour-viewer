import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { ticksToDateString } from "../../converters/dateConverters";
import { setEditingTour } from "../../store/tourStateReducer";
import { Roles } from "../../constants/Rolenames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { TourDto } from "../../dtos/tourDto";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export type TourListItemProps = {
    tour: TourDto;
    onSelected: () => void;
}

export const TourListItem: FunctionComponent<TourListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const canEdit = (user?.roles.includes(Roles.Admin)
        || props.tour.participants.find(p => p.id === user?.id))
        ?? false;

    const selectTour = (tourId: number) => {
        dispatch(loadTourRequest(tourId))
            .unwrap()
            .catch()
            .then(() => props.onSelected?.())
    }
    const editTour = (tourId: number) => {
        dispatch(loadTourRequest(tourId))
            .unwrap()
            .catch()
            .then((tour) => {
                props.onSelected?.();
                dispatch(setEditingTour(tour))
                navigate(Paths.EditTourPage);
            })
    }

    return <div key={'tour' + props.tour.id} className="flex flex-row">
        <Button sx={{ width: '100%' }} onClick={() => selectTour(props.tour.id)}>
            <div className="flex flex-row items-center w-full justify-between" >
                <div>
                    {props.tour.name}
                </div>
                <div>
                    {ticksToDateString(props.tour.startDate)}
                </div>
            </div>
        </Button>
        {
            canEdit ? <Button onClick={() => editTour(props.tour.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
                : <></>
        }
    </div>
}