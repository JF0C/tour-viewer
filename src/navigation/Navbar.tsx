import { FunctionComponent } from 'react';
import { menuTree } from './MenuTree';
import { NavSubMenu } from './NavSubmenu';

export const Navbar: FunctionComponent = () => {

    const navigations = [];
    for (let node of menuTree) {
        navigations.push(<NavSubMenu
            radioGroupId={'toplevel'}
            data={node}
        />);
    }

    return <ul className='nav-list'>
        {navigations}
    </ul>
}