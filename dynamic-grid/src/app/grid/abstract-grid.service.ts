import { HttpParams } from '@angular/common/http';

export interface AbstractGridService<T> {
    fetch(params?: HttpParams): Promise<T[]>;
}
