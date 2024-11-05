import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import { UserDto } from "../../dtos/userDto";
import { useAppDispatch } from "../../store/store";
import { deleteProfilePictureRequest, uploadProfilePictureRequest } from "../../store/userThunk";
import { ConfirmModal } from "../shared/ConfirmModal";
import { ProfilePicture } from "./ProfilePicture";

export type ProfilePictureEditorProps = {
    user: UserDto
}

export const ProfilePictureEditor: FunctionComponent<ProfilePictureEditorProps> = (props) => {
    const dispatch = useAppDispatch();
    const hasProfilePicture = props.user.profilePictureId !== undefined && props.user.profilePictureId !== null;

    const inputFileRef = useRef<HTMLInputElement>(null);

    const uploadProfilePicture = () => {
        const file = inputFileRef?.current?.files?.[0];
        if (!file) {
            return;
        }
        dispatch(uploadProfilePictureRequest({
            file: file,
            onChunk: (e) => console.log(e)
        }));
    }

    const deleteProfilePicture = () => {
        dispatch(deleteProfilePictureRequest());
    }

    return <div className="flex flex-col items-center">
        {
            hasProfilePicture ?
                <ProfilePicture user={props.user} />
                : <>no profile picture</>
        }
        <div className="flex flex-row">
            <Button onClick={() => inputFileRef.current?.click()}>
                <FontAwesomeIcon icon={faImage}/>&nbsp;
                {
                    hasProfilePicture ? 'New picture' : 'Add picture'
                }
            </Button>
            <input ref={inputFileRef} onChange={() => uploadProfilePicture()}
                className="hidden" type="file" name="data" accept="image/jpeg" />
            <ConfirmModal buttonContent={<>
                <FontAwesomeIcon icon={faTrash} />&nbsp;Delete picture
            </>} message="Are you sure that you want to delete you profile picture?" onConfirm={deleteProfilePicture}
                type='error'
            />

        </div>
    </div>
}