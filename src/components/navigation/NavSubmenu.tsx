import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FunctionComponent } from "react";
import { TourLink } from "./TourLink";
import { MenuGroup } from "./MenuGroup";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setRadioGroup } from '../../store/tourStateReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export type NavSubMenuProps = {
    data: MenuGroup;
    onClick?: () => void;
    radioGroupId?: string;
}

export const NavSubMenu: FunctionComponent<NavSubMenuProps> = (props) => {
    const color = document.location.pathname.includes(props.data.path) ? 'rgba(124, 148, 150, 0.8)' : 'rgb(50,50,50)';
    const dispatch = useAppDispatch();
    const isExpanded = useAppSelector((state) => {
        const item = state.tour.radioGroups.find(r => r.groupId === props.radioGroupId);
        if (!props.radioGroupId) return undefined;
        if (!item) return false;
        return item.activeItem === props.data.path;
    });

    const radioActivation = (e: any) => {
        if (!props.radioGroupId) {
            return;
        }
        const closing = e.currentTarget.className.split(' ').includes('Mui-expanded');
        if (e.target.id === props.data.displayName && closing){
            return;
        }
        dispatch(setRadioGroup({ groupId: props.radioGroupId, activeItem: closing ? undefined : props.data.path }));
    }

    return <Accordion expanded={isExpanded} onChange={(e: any) => radioActivation(e)} sx={{ bgcolor: 'rgb(50,50,50)', color: 'white' }}>
        <AccordionSummary sx={{ bgcolor: color }} expandIcon={<FontAwesomeIcon style={{ color: 'white' }} icon={faChevronDown}/>}>
        <div className='flex flex-row justify-center items-center'>
            <TourLink key={props.data.displayName + 'link'} displayName={props.data.displayName}
                tours={props.data.items?.map(i => `${props.data.path}/${i.tour}`) ?? []} />
        </div>
        </AccordionSummary>
        <AccordionDetails>
            {
                props.data.subGroups?.map(s => <NavSubMenu key={s.path} radioGroupId={props.data.path} data={s} onClick={props.onClick} />)
            }
            {
                props.data.items?.map(i => <TourLink key={i.displayName}
                    displayName={i.displayName}
                    tours={[`${props.data.path}/${i.tour}`]}
                />)
            }
        </AccordionDetails>
    </Accordion>
}