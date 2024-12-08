import { PageRequestDto } from "../shared/pageRequestDto"

export type KomootPageRequestDto = PageRequestDto & {
    authString: string;
    userId: number;
    name?: string;
    startDate?: Date;
    endDate?: Date;
}
