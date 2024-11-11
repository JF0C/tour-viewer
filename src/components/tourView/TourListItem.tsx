import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { Roles } from "../../constants/Rolenames";
import { millisToDateString } from "../../converters/dateConverters";
import { TourDto } from "../../dtos/tourDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingTour } from "../../store/tourStateReducer";
import { loadTourRequest, setSelectedTourId } from "../../store/tourThunk";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

export type TourListItemProps = {
    tour: TourDto;
    onSelected: () => void;
}

export const TourListItem: FunctionComponent<TourListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const defaultTourId = useAppSelector((state) => state.tour.defaultTourId);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const canEdit = (isAdmin || props.tour.participants.find(p => p.id === user?.id)) ?? false;

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
    const setAsDefaultTour = () => {
        dispatch(setSelectedTourId(props.tour.id));
    }

    return <div key={'tour' + props.tour.id} className="flex flex-row">
        <Button sx={{ width: '100%' }} onClick={() => selectTour(props.tour.id)}>
            <div className="flex flex-row items-center w-full justify-between" >
                <div>
                    {props.tour.name}
                </div>
                <div>
                    {millisToDateString(props.tour.startDate)}
                </div>
            </div>
        </Button>
        {
            canEdit ? <Button onClick={() => editTour(props.tour.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            : <></>
        }
        {
            isAdmin && defaultTourId !== props.tour.id? <Button onClick={setAsDefaultTour}>
                <FontAwesomeIcon icon={faSquare}/>
            </Button>
            : <></>
        }
        {
            isAdmin && defaultTourId === props.tour.id ?
            <Button>
                <FontAwesomeIcon icon={faCheckSquare}/>
            </Button>
            :<></>
        }
    </div>
}