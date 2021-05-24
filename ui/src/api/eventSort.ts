export enum Order {
    Asc = 'asc',
    Desc = 'desc',
}

export interface EventSortSettings {
    sortBy: string;
    sortOrder: Order;
}
