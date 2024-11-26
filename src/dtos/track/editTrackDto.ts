export type EditTrackDto = {
    tourId: number;
    id: number;
    name: string;
    tourPosition: number;
    data: string;
    externalId?: string;
    externalSource?: string;
}