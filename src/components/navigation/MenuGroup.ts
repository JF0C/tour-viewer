export type MenuGroup = {
    displayName: string;
    path: string;
    subGroups?: MenuGroup[];
    items?: TourItem[]
}

export type TourItem = {
    tour: string;
    displayName: string;
}