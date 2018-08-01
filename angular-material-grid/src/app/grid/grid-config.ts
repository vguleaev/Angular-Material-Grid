import { GridColumn } from './grid-column';
import { AbstractGridService } from './abstract-grid.service';
import { AbstractGridFilter } from './abstract-grid-filter';
import { Type } from '@angular/core';

export class GridConfig {
    searchPlaceholder = 'Search';
    pageSize = 10;
    source:  AbstractGridService<any>;
    columns: GridColumn[];
    filters: Type<AbstractGridFilter>[];
}
