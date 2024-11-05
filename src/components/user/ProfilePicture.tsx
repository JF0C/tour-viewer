import { FunctionComponent } from "react";
import { UserReferenceDto } from "../../dtos/userReferenceDto";
import { ApiUrls } from "../../constants/ApiUrls";

export type ProfilePictureProps = {
    user: UserReferenceDto
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = (props) => {

    return <div>
        <img width={200}
            src={`${ApiUrls.BaseUrl}/img/${props.user.profilePictureId}.jpg`}
            alt={props.user.profilePictureId} />
    </div>
}