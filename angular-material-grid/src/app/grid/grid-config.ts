import { GridColumn } from './grid-column';
import { GridService } from './grid.service';
import { AbstractGridFilter } from './abstract-grid-filter';
import { Type } from '@angular/core';

export class GridConfig {
    searchPlaceholder = 'Search';
    pageSize = 10;
    source:  GridService;
    columns: GridColumn[];
    filters: Type<AbstractGridFilter>[];
    mobileViewColumnIndex = 0;
    rememberState = false;
}
