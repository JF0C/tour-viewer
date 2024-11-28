import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { millisToUtcDate } from "../../converters/dateConverters";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingTour, setEditingTourName, setEditingTourStartDate } from "../../store/tourStateReducer";
import { changeTourStartDateRequest, deleteTourRequest, loadTourRequest, renameTourRequest, searchTours } from "../../store/tourThunk";
import { clearTracks, resetBoundsSet } from "../../store/trackStateReducer";
import { BigFormLayout } from "../layout/BigFormLayout";
import { ConfirmModal } from "../shared/ConfirmModal";
import { EditableDateLabel } from "../shared/EditableDateLabel";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserSearch } from "../user/UserSearch";
import { TrackList } from "./TrackList";
import { ParticipantResultView } from "./ParticipantResultView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";
import { loadTrackRequest } from "../../store/trackThunk";


export const EditTour: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.tour.tourPagination);
    const navigate = useNavigate();
    const tourState = useAppSelector((state) => state.tour);

    const changeTourName = (name: string) => {
        dispatch(renameTourRequest({ tourId: tourState.editingTour.id, name: name }))
            .unwrap()
            .catch()
            .then(() => dispatch(setEditingTourName(name)))

    }
    const changeTourStartDate = (ticks: number) => {
        dispatch(changeTourStartDateRequest({
            tourId: tourState.editingTour.id,
            startDate: millisToUtcDate(ticks)
        }))
            .unwrap()
            .catch()
            .then(() => dispatch(setEditingTourStartDate(ticks)))
    }

    if (tourState.loading) {
        return <LoadingSpinner />
    }

    const reloadTour = () => {
        dispatch(clearTracks());
        dispatch(loadTourRequest(tourState.editingTour.id))
            .unwrap()
            .then((tour) => {
                dispatch(setEditingTour(tour));
                tour.tracks.forEach(t => dispatch(loadTrackRequest({
                    fileReference: t.fileReference,
                    name: t.name,
                    tourPosition: t.tourPosition
                })));
            });
    }

    const cancelEditing = () => {
        dispatch(resetBoundsSet());
        reloadTour();
        navigate(Paths.HomePage);
    }

    const deleteTour = () => {
        dispatch(deleteTourRequest(tourState.editingTour.id))
            .unwrap().then(() => {
                dispatch(searchTours({
                    page: pagination.page,
                    count: pagination.itemsPerPage
                })).then(() => navigate(Paths.HomePage));
            })
    }

    return <BigFormLayout buttons={
        <>
            <ConfirmModal type='error' onConfirm={deleteTour}
                message={`Do you really want to delete tour ${tourState.editingTour.name}`}
                buttonContent={<>Delete</>} />
            <Button onClick={reloadTour}>Reload</Button>
            {
                tourState.editingTour.id === 0 ?
                    <Button color='warning' onClick={cancelEditing}>
                        Cancel
                    </Button>
                    :
                    <Button onClick={cancelEditing}>
                        Done
                    </Button>
            }
        </>
    }>
        <table>
            <tbody>
                <tr>
                    <td className="font-bold">
                        Name
                    </td>
                    <td>
                        <EditableNameLabel value={tourState.editingTour.name}
                            inputType="text" name="Name"
                            onApply={changeTourName} minLength={3} maxLength={100} />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold">
                        Start Date
                    </td>
                    <td>
                        <EditableDateLabel value={tourState.editingTour.startDate}
                            onApply={changeTourStartDate} />
                    </td>
                </tr>
            </tbody>
        </table>
        <UserSearch>
            <ParticipantResultView />
        </UserSearch>
        <NavLink to={Paths.KomootTourStartPage}>
            <Button>
                <img width={20} src="icon/komoot-icon.png" alt='komoot-icon'/>
                &nbsp;
                Import from Komoot
            </Button>
        </NavLink>
        <NavLink to={Paths.StravaTourStartPage}>
            <Button>
                <img width={20} src="icon/strava-icon.png" alt='komoot-icon'/>
                &nbsp;
                Import from Strava
            </Button>
        </NavLink>
        <NavLink to={Paths.MergeTracksPage}>
            <Button>
                <FontAwesomeIcon icon={faCodeMerge}/>
                &nbsp;
                Merge Tracks
            </Button>
        </NavLink>
        <TrackList onReload={reloadTour} />
    </BigFormLayout>
}

