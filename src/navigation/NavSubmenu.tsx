import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FunctionComponent } from "react";
import { TourLink } from "./TourLink";
import { MenuGroup } from "./MenuGroup";
import { useAppDispatch, useAppSelector } from '../store/store';
import { setRadioGroup } from '../store/uiStateReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export type NavSubMenuProps = {
    data: MenuGroup;
    onClick?: () => void;
    radioGroupId?: string;
}

export const NavSubMenu: FunctionComponent<NavSubMenuProps> = (props) => {
    const color = document.location.pathname.includes(props.data.groupId) ? 'rgba(124, 148, 150, 0.8)' : 'rgb(50,50,50)';
    const dispatch = useAppDispatch();
    const isExpanded = useAppSelector((state) => {
        const item = state.uistate.radioGroups.find(r => r.groupId === props.radioGroupId);
        if (!props.radioGroupId) return undefined;
        if (!item) return false;
        return item.activeItem === props.data.groupId;
    });

    const radioActivation = (e: any) => {
        if (!props.radioGroupId) {
            return;
        }
        const closing = e.currentTarget.className.split(' ').includes('Mui-expanded');
        dispatch(setRadioGroup({ groupId: props.radioGroupId, activeItem: closing ? undefined : props.data.groupId }));
    }

    return <Accordion expanded={isExpanded} onChange={(e: any) => radioActivation(e)} sx={{ bgcolor: 'rgb(50,50,50)', color: 'white' }}>
        <AccordionSummary sx={{ bgcolor: color }} expandIcon={<FontAwesomeIcon icon={faChevronDown}/>}>
        <div className='flex flex-row justify-center items-center'>
            <TourLink displayName={props.data.displayName}
                path={props.data.path} />
        </div>
        </AccordionSummary>
        <AccordionDetails>
            {
                props.data.subGroups?.map(s => <NavSubMenu radioGroupId={props.data.groupId} data={s} onClick={props.onClick} />)
            }
            {
                props.data.items?.map(i => <TourLink
                    displayName={i.displayName}
                    path={i.location}
                />)
            }
        </AccordionDetails>
    </Accordion>
}