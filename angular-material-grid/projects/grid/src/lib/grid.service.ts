import { HttpParams } from '@angular/common/http';
import { GridData } from './grid-data';
import { Observable } from 'rxjs';

export interface GridService {
    fetch(params?: HttpParams): Observable<GridData>;
}
