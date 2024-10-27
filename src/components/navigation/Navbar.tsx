import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../constants/Paths';
import { TourSelector } from '../tourView/TourSelector';
import { useAppSelector } from '../../store/store';
import { Roles } from '../../constants/Rolenames';

export type NavbarProps = {
    closeSidebar: () => void
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const isContributor = user?.roles.includes(Roles.Contributor);

    return <ul className='nav-list'>
        <NavLink onClick={() => props.closeSidebar()} to={Paths.HomePage}>
            <Button>
                <FontAwesomeIcon icon={faHome} />
                &nbsp; Home
            </Button>
        </NavLink>
        <TourSelector />
        {
            isContributor ?
            <NavLink to={Paths.CreateTourPage}>
                <Button>
                    <FontAwesomeIcon icon={faPlus}/>
                    &nbsp;Create Tour
                </Button>
            </NavLink>
            : <></>
        }
        {
            isAdmin ?
            <NavLink onClick={() => props.closeSidebar()} to={Paths.AdminPage}>
                <Button>
                    <FontAwesomeIcon icon={faUser}/>
                    &nbsp; Admin
                </Button>
            </NavLink>
            : <></>
        }
    </ul>
}