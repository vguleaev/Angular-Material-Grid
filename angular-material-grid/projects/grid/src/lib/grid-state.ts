import { GridFilter } from './grid-filter';

export class GridState {
    query: string;
    searchColumns: string[];
    orderDirection: 'asc' | 'desc';
    orderBy: string;
    page: number;
    pageSize: number;
    filters: GridFilter[] = [];
}
