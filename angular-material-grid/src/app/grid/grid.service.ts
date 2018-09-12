import { HttpParams } from '@angular/common/http';
import { GridData } from './grid-data';

export interface GridService {
    fetch(params?: HttpParams): Promise<GridData>;
}
