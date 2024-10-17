export type MenuGroup = {
    displayName: string;
    groupId: string;
    path: string;
    subGroups?: MenuGroup[];
    items?: LocationAndDisplayName[]
}

export type LocationAndDisplayName = {
    location: string;
    displayName: string;
}