import { faEdit, faHome, faImage, faPlus, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../constants/Paths';
import { Roles } from '../../constants/Rolenames';
import { setEditingBlogpost } from '../../store/blogPostStateReducer';
import { createNewBlogPost, isAllowedToCreate } from '../../store/stateHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetEditingTour, setEditingTour } from '../../store/tourStateReducer';
import { resetBoundsSet } from '../../store/trackStateReducer';
import { TourSelector } from '../tourView/TourSelector';
import { UserSearchModal } from '../user/UserSearchModal';
import { VersionInfo } from '../shared/VersionInfo';
import { setMarkerPosition } from '../../store/mapStateReducer';
import { MapSelector } from '../tourView/MapSelector';

export type NavbarProps = {
    closeSidebar: () => void
}

export const Navbar: FunctionComponent<NavbarProps> = (props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.roles.includes(Roles.Admin);
    const isContributor = user?.roles.includes(Roles.Contributor);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const tracks = useAppSelector((state) => state.track.tracks);
    const canEdit = useAppSelector((state) => isAllowedToCreate(state));
    const mapCenter = useAppSelector((state) => state.map.mapCenter);

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
        createNewBlogPost(dispatch, mapCenter, tracks)
        dispatch(setMarkerPosition({
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude
        }))
    }

    const startCreatingTour = () => {
        props.closeSidebar();
        dispatch(resetEditingTour());
    }

    return <ul className='nav-list flex flex-col gap-2 items-start h-full'>
        <div className='flex-1 flex flex-col'>
            <div className="h-16 placeholder"></div>
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
                        <Button onClick={createBlogPost}>
                            <FontAwesomeIcon icon={faImage} />
                            &nbsp;Add Post
                        </Button>
                    </>
                    : <></>
            }
            {
                isContributor ?
                <NavLink to={Paths.BlogPostLabelsPage} onClick={props.closeSidebar}>
                    <Button>
                        <FontAwesomeIcon icon={faTags}/>
                        &nbsp;Manage Labels
                    </Button>
                </NavLink>
                :<></>
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
        <MapSelector />
        </div>
        <VersionInfo />
    </ul>
}