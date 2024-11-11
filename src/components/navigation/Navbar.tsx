import { faEdit, faHome, faImage, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../constants/Paths';
import { Roles } from '../../constants/Rolenames';
import { setEditingBlogpost, setMarkerPosition } from '../../store/blogPostStateReducer';
import { isAllowedToCreate } from '../../store/stateHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetEditingTour, setEditingTour } from '../../store/tourStateReducer';
import { resetBoundsSet } from '../../store/trackStateReducer';
import { TourSelector } from '../tourView/TourSelector';
import { UserSearchModal } from '../user/UserSearchModal';

export type NavbarProps = {
    closeSidebar: () => void
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const isContributor = user?.roles.includes(Roles.Contributor);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const canEdit = useAppSelector((state) => isAllowedToCreate(state));
    const mapCenter = useAppSelector((state) => state.blog.mapCenter);

    const editCurrentTour = () => {
        props.closeSidebar();
        if (tour !== undefined) {
            dispatch(setEditingTour(tour));
        }
    }

    const createBlogPost = () => {
        if (!mapCenter || !tour) {
            return;
        }
        props.closeSidebar();
        dispatch(setEditingBlogpost({
            id: 0,
            trackId: tour.tracks[0].id,
            trackFileReference: tour.tracks[0].fileReference,
            title: '',
            message: '',
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
            images: []
        }));
        dispatch(setMarkerPosition({
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude
        }))
    }

    const startCreatingTour = () => {
        props.closeSidebar();
        dispatch(resetEditingTour());
    }

    return <ul className='nav-list flex flex-col gap-2 items-start'>
        <NavLink onClick={() => { props.closeSidebar(); dispatch(resetBoundsSet()) }} to={Paths.HomePage}>
            <Button>
                <FontAwesomeIcon icon={faHome} />
                &nbsp; Home
            </Button>
        </NavLink>
        <TourSelector showIcon title='Select Tour' onSelected={props.closeSidebar} />
        <UserSearchModal />
        {
            isContributor ?
                <NavLink to={Paths.CreateTourPage} onClick={startCreatingTour}>
                    <Button>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Create Tour
                    </Button>
                </NavLink>
                : <></>
        }
        {
            (canEdit && tour !== undefined) ?
                <>
                    <NavLink to={Paths.EditTourPage} onClick={editCurrentTour}>
                        <Button>
                            <FontAwesomeIcon icon={faEdit} />
                            &nbsp;Edit Tour
                        </Button>
                    </NavLink>
                    <div className='md:hidden'>
                        <Button onClick={createBlogPost}>
                            <FontAwesomeIcon icon={faImage} />
                            &nbsp;Add Post
                        </Button>
                    </div>
                </>
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