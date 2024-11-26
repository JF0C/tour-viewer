import { EntityBaseDto } from "../shared/entityBaseDto";

export type UserDto = EntityBaseDto & {
    id: number;
    username: string;
    email: string;
    validated: boolean;
    roles: string[];
    profilePictureId?: string;
    profilePictureParameters?: string;
}