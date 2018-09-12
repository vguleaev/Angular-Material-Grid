import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridService } from '../grid/grid.service';
import { AotSummaryResolver } from '../../../node_modules/@angular/compiler';
import { GridState } from '../grid/grid-state';
import { GridData } from '../grid/grid-data';

@Injectable()
export class DataService implements GridService {
    private _productUrl = 'assets/json/data.json'; // fake

    constructor(private _http: HttpClient) {}

    fetch(params?: HttpParams): Promise<GridData> {
        const query = params.get('query');
        const state: GridState = JSON.parse(atob(query));


        return this._http.get<any[]>(this._productUrl, {params: params}).pipe(
            map(result => {
                const totalItems = result.length;

                if (state) {
                    if (state.query) {
                        result = result.filter(x => x.name && x.name.toLowerCase().indexOf(state.query.toLowerCase()) > -1 ||
                                                  x.username && x.username.toLowerCase().indexOf(state.query.toLowerCase()) > -1 ||
                                                  x.email && x.email.toLowerCase().indexOf(state.query.toLowerCase()) > -1);
                    }
                    if (state.orderBy) {
                        if (state.orderBy.toLowerCase() === 'id') {
                            result.sort((a, b) => {
                                if (a.id < b.id) {
                                  return -1;
                                }
                                if (a.id > b.id) {
                                  return 1;
                                }
                                return 0;
                            });
                        }
                        if (state.orderBy.toLowerCase() === 'name') {
                            result.sort((a, b) => {
                                if (a.name < b.name) {
                                  return -1;
                                }
                                if (a.name > b.name) {
                                  return 1;
                                }
                                return 0;
                            });
                        }
                        if (state.orderBy.toLowerCase() === 'username') {
                            result.sort((a, b) => {
                                if (a.username < b.username) {
                                  return -1;
                                }
                                if (a.username > b.username) {
                                  return 1;
                                }
                                return 0;
                            });
                        }
                        if (state.orderBy.toLowerCase() === 'email') {
                            result.sort((a, b) => {
                                if (a.email < b.email) {
                                  return -1;
                                }
                                if (a.email > b.email) {
                                  return 1;
                                }
                                return 0;
                            });
                        }

                        if (state.orderDirection === 'desc') {
                            result.reverse();
                        }
                    }
                    const startIndex = (state.page - 1) * state.pageSize;
                    const endIndex = (result.length - startIndex) > state.pageSize ? state.pageSize : result.length;
                    result = result.slice(startIndex, endIndex);
                }
                return {data: result, totalItems: totalItems};
            }))
        .toPromise();
    }
}
