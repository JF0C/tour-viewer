import { FunctionComponent } from "react";
import { UserReferenceDto } from "../../dtos/userReferenceDto";
import { ApiUrls } from "../../constants/ApiUrls";
import { ProfilePictureParametersDto } from "../../dtos/profilePictureParametersDto";

export type ProfilePictureProps = {
    user: UserReferenceDto,
    size: number,
    parameters?: ProfilePictureParametersDto
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = (props) => {
    const userParameters: ProfilePictureParametersDto = JSON.parse(props.user.profilePictureParameters ?? '{"zoom":1,"left":0,"top":0}');
    const zoom = (props.parameters ? Math.max(props.parameters.zoom, 1) : userParameters.zoom);
    const left = (props.parameters?.left ?? userParameters.left) / 300 * props.size;
    const top = (props.parameters?.top ?? userParameters.top) / 300 * props.size;
    return <div className="rounded-full overflow-clip flex justify-center items-center" 
        style={{width: `${props.size}px`, height: `${props.size}px`}}>
        <img width={props.size} style={{ 
            transform: `scale(${zoom}) translate(${left}px,${top}px)`,
            pointerEvents: 'none'
        }}
            src={`${ApiUrls.BaseUrl}/img/${props.user.profilePictureId}.jpg`}
            alt={props.user.profilePictureId} />
    </div>
}