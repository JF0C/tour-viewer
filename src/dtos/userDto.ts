import { EntityBaseDto } from "./entityBaseDto";

export type UserDto = EntityBaseDto & {
    id: number;
    username: string;
    email: string;
    validated: boolean;
    roles: string[];
    profilePictureId?: string;
    profilePictureParameters?: string
}