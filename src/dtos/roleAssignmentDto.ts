export type roleAssignmentDto = {
    role: string;
    userId: number;
    action: 'assign' | 'unassign'
}