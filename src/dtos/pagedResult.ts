export type PagedResult<T> = {
    items: T[]
    page: number
    totalPages: number
    totalItems: number
}