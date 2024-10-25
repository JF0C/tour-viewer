import { EntityBaseDto } from "./entityBaseDto";

export type UserDto = EntityBaseDto & {
    id: number;
    username: string;
    email: string;
    roles: string[];
}