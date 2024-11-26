import { faEdit, faFloppyDisk, faImage, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Slider } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { UserDto } from "../../dtos/user/userDto";
import { useAppDispatch } from "../../store/store";
import { deleteProfilePictureRequest, setProfilePictureParametersRequest, uploadProfilePictureRequest } from "../../store/userThunk";
import { ConfirmModal } from "../shared/ConfirmModal";
import { ProfilePicture } from "./ProfilePicture";

export type ProfilePictureEditorProps = {
    user: UserDto
}

export const ProfilePictureEditor: FunctionComponent<ProfilePictureEditorProps> = (props) => {
    const dispatch = useAppDispatch();
    const hasProfilePicture = props.user.profilePictureId !== undefined
        && props.user.profilePictureId !== null;
    const [editing, setEditing] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [clickPosition, setClickPosition] = useState<{ x: number, y: number } | undefined>(undefined);
    const [movedPosition, setMovedPosition] = useState({ x: 0, y: 0 });

    const inputFileRef = useRef<HTMLInputElement>(null);

    const uploadProfilePicture = () => {
        const file = inputFileRef?.current?.files?.[0];
        if (!file) {
            return;
        }
        dispatch(uploadProfilePictureRequest({
            file: file,
            onChunk: (e) => console.log(e)
        }))
        .unwrap()
        .then(() => {
            dispatch(setProfilePictureParametersRequest({
                zoom: 1,
                left: 0,
                top: 0
            }))
        });
    }

    const saveParameters = () => {
        dispatch(setProfilePictureParametersRequest({
            zoom: zoom,
            left: movedPosition.x,
            top: movedPosition.y
        }));
    }

    const deleteProfilePicture = () => {
        dispatch(deleteProfilePictureRequest());
    }

    const moveImageMouse = (e: React.MouseEvent) => {
        if (e.buttons !== 1) {
            setClickPosition(undefined);
            return;
        }
        if (!clickPosition) {
            return;
        }
        const coordinates = {
            x: e.clientX - clickPosition.x,
            y: e.clientY - clickPosition.y
        }
        setMovedPosition(coordinates);
    }

    const moveImageTouch = (e: React.TouchEvent) => {
        if (!clickPosition) {
            return;
        }
        setMovedPosition({ x: e.touches[0].clientX - clickPosition.x, y: e.touches[0].clientY - clickPosition.y });
        e.preventDefault();
    }

    return <div className="flex flex-col items-center">
        {
            hasProfilePicture ?
                <div onMouseDown={(e) => setClickPosition({ x: e.clientX - movedPosition.x, y: e.clientY - movedPosition.y })}
                    onMouseMove={moveImageMouse}
                    onMouseLeave={() => setClickPosition(undefined)}
                    onTouchStart={(e) => setClickPosition({ x: e.touches[0].clientX - movedPosition.x, y: e.touches[0].clientY - movedPosition.y })}
                    onTouchMove={moveImageTouch}
                >
                    <ProfilePicture user={props.user} size={300}
                        parameters={editing ? { zoom: zoom, left: movedPosition.x, top: movedPosition.y } : undefined} />
                </div>
                : <>no profile picture</>
        }
        {
            editing ?
                <><div className="w-44">
                    <Slider defaultValue={1} min={1} max={5} step={0.05} onChange={(e: any) => setZoom(e.target.value)} />
                </div>
                    <div className="flex flex-row">
                        <Button onClick={saveParameters}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            &nbsp;Save
                        </Button>
                        <Button onClick={() => inputFileRef.current?.click()}>
                            <FontAwesomeIcon icon={faImage} />&nbsp;
                            {
                                hasProfilePicture ? 'New' : 'Add'
                            }
                        </Button>
                        <input ref={inputFileRef} onChange={() => uploadProfilePicture()}
                            className="hidden" type="file" name="data" accept="image/jpeg" />
                        <ConfirmModal buttonContent={<>
                            <FontAwesomeIcon icon={faTrash} />&nbsp;Delete
                        </>} message="Are you sure that you want to delete you profile picture?" onConfirm={deleteProfilePicture}
                            type='error'
                        />
                        <Button onClick={() => setEditing(false)}>
                            <FontAwesomeIcon icon={faX} />
                            &nbsp;Cancel
                        </Button>
                    </div>
                </>
                :
                <Button onClick={() => setEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                    &nbsp;Edit
                </Button>
        }

    </div>
}