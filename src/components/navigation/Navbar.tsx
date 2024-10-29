import { faEdit, faHome, faInfoCircle, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../constants/Paths';
import { TourSelector } from '../tourView/TourSelector';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Roles } from '../../constants/Rolenames';
import { showInfobar, setEditingTour } from '../../store/tourStateReducer';
import { isAllowedToCreate } from '../../store/stateHelpers';
import { resetBoundsSet } from '../../store/trackStateReducer';

export type NavbarProps = {
    closeSidebar: () => void
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const isContributor = user?.roles.includes(Roles.Contributor);
    const infoBarVisible = useAppSelector((state) => state.tour.showInfoBar);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const canEdit = useAppSelector((state) => isAllowedToCreate(state));

    const editCurrentTour = () => {
        props.closeSidebar();
        if (tour !== undefined) {
            dispatch(setEditingTour(tour));
        }
    }

    return <ul className='nav-list flex flex-col gap-2 items-start'>
        <NavLink onClick={() => {props.closeSidebar(); dispatch(resetBoundsSet())}} to={Paths.HomePage}>
            <Button>
                <FontAwesomeIcon icon={faHome} />
                &nbsp; Home
            </Button>
        </NavLink>
        <TourSelector showIcon title='Select Tour' onSelected={props.closeSidebar} />
        {
            isContributor ?
                <NavLink to={Paths.CreateTourPage}>
                    <Button>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Create Tour
                    </Button>
                </NavLink>
                : <></>
        }
        {
            (canEdit && tour !== undefined) ?
                <NavLink to={Paths.EditTourPage} onClick={editCurrentTour}>
                    <Button>
                        <FontAwesomeIcon icon={faEdit} />
                        &nbsp;Edit Tour
                    </Button>
                </NavLink>
                : <></>
        }
        {
            isAdmin ?
                <NavLink onClick={() => props.closeSidebar()} to={Paths.AdminPage}>
                    <Button>
                        <FontAwesomeIcon icon={faUser} />
                        &nbsp; Admin
                    </Button>
                </NavLink>
                : <></>
        }
    </ul>
}