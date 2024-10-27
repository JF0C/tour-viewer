import { faHome, faInfoCircle, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../constants/Paths';
import { TourSelector } from '../tourView/TourSelector';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Roles } from '../../constants/Rolenames';
import { showInfobar } from '../../store/tourStateReducer';

export type NavbarProps = {
    closeSidebar: () => void
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const isContributor = user?.roles.includes(Roles.Contributor);
    const infoBarVisible = useAppSelector((state) => state.tour.showInfoBar);

    return <ul className='nav-list flex flex-col gap-2 items-start'>
        <NavLink onClick={() => props.closeSidebar()} to={Paths.HomePage}>
            <Button>
                <FontAwesomeIcon icon={faHome} />
                &nbsp; Home
            </Button>
        </NavLink>
        <Button onClick={() => dispatch(showInfobar(!infoBarVisible))}>
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp;Show Info
        </Button>
        <TourSelector />
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