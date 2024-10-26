export type MenuGroup = {
    displayName: string;
    path: string;
    subGroups?: MenuGroup[];
    items?: TrackItem[]
}

export type TrackItem = {
    id: number;
    tourPosition: number;
    name: string;
}