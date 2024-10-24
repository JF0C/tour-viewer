import { FunctionComponent } from 'react';
import { menuTree } from './MenuTree';
import { NavSubMenu } from './NavSubmenu';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Paths } from '../../constants/Paths';
import { NavLink } from 'react-router-dom';

export type NavbarProps = {
    closeSidebar: () => void
}


export const Navbar: FunctionComponent<NavbarProps> = (props) => {

    const navigations = [];

    navigations.push(<Button>
        <NavLink onClick={() => props.closeSidebar()} to={Paths.HomePage}>
            <FontAwesomeIcon icon={faHome} />
            &nbsp; Home
        </NavLink>
    </Button>)

    for (let node of menuTree) {
        navigations.push(<NavSubMenu
            key={node.displayName + '-menu'}
            radioGroupId={'toplevel'}
            data={node}
        />);
    }

    return <ul className='nav-list'>
        {navigations}
    </ul>
}