import { Button } from "@mui/material"
import { FunctionComponent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { faInfoCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setInfobarOpen } from "../../store/viewStateReducer";

export const InfoBarHandle: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const viewState = useAppSelector((state) => state.view);
    const infobarOpen = viewState.infobarOpen;
    const isTourSelected = useAppSelector((state) => state.tour.selectedTour !== undefined);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const isViewingBlogPost = useAppSelector((state) => state.blog.selectedBlogPost !== undefined);
    const hideHandle = (infobarOpen || isEditingBlogPost || isViewingBlogPost) ? 'hide' : '';
    const usingSearchFilter = !isTourSelected || viewState.mapMode === 'blogPosts';

    return <div id='info-bar-handle' className={`absolute bottom-0 md:right-0 p-2 w-full md:w-auto md:h-full flex flex-row md:flex-col justify-center ${hideHandle}`}>
        <div style={{ zIndex: 1000 }} className="selector-field rounded-md border-black">
            <Button sx={{ minWidth: '25px' }} onClick={() => dispatch(setInfobarOpen(true))}>
                <FontAwesomeIcon icon={usingSearchFilter ? faMagnifyingGlass : faInfoCircle } />
            </Button>
        </div>
    </div>
}