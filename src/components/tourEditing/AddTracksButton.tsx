import { faCheckDouble, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FunctionComponent, useRef } from "react";
import { Limits } from "../../constants/Limits";
import { TrackUploadItem } from "../../data/trackUploadItem";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTracksToUpload } from "../../store/tourStateReducer";

export type AddTracksButtonProps = {
    disabled?: boolean;
}

export const AddTracksButton: FunctionComponent<AddTracksButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const editingTour = useAppSelector((state) => state.tour.editingTour);
    const selectedFiles = editingTour.tracksToUpload;
    const maxTourPosition = editingTour.tracks.length === 0 ? 1 :
        (Math.max(...editingTour.tracks.map(t => t.tourPosition)) + 1);
    const inputRef = useRef<HTMLInputElement>(null);

    const filesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        if (files.length > Limits.MaxGpxFilesForDownload) {
            enqueueSnackbar('You can upload at most 10 files at once', {variant: 'error'});
            return;
        }
        const tracks: TrackUploadItem[] = [];
        for (let k = 0; k < files.length; k++) {
            tracks.push({
                id: k,
                isValid: files[k].name.length > 2,
                name: files[k].name.replace('.gpx', ''),
                tourPosition: maxTourPosition + k,
                state: 'ready',
                data: await files[k].text()
            });
        }
        dispatch(setTracksToUpload(tracks));
    }

    return <Button disabled={props.disabled} onClick={() => inputRef.current?.click()}>
        {
            selectedFiles.length === 0 ?
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faPlus} />
                    <div className="hidden md:block">
                        &nbsp;Add Files
                    </div>
                </div>
                :
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faCheckDouble} />
                    <div className="hidden md:block">
                        &nbsp;Change Files
                    </div>
                </div>
        }
        <input onChange={filesSelected} className="hidden" ref={inputRef} multiple accept=".gpx" type='file' />
    </Button>
}