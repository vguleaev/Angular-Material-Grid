import { GridFilter } from './grid-filter';

export class GridState {
    query: string;
    searchColumns: Array<string>;
    orderDirection: 'asc' | 'desc';
    orderBy: string;
    page: number;
    pageSize: number;
    filters: Array<GridFilter> = new Array<GridFilter>();
}
