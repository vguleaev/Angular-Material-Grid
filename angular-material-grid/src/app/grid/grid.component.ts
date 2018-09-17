import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Sort, PageEvent, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GridConfig } from './grid-config';
import { GridState } from './grid-state';
import { GridColumn } from './grid-column';
import { GridFilter } from './grid-filter';
import { AbstractGridFilter } from './abstract-grid-filter';
import { GridService } from './grid.service';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs/operators';

@Component({
    selector: 'ng-mat-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {
    @Input() gridName: string;
    @Input() config: GridConfig;

    state: GridState;
    sortedData: Array<any> = [];
    searchFormControl = new FormControl();
    totalItems = 0;
    private customFilters: Array<AbstractGridFilter> = [];
    @ViewChild(MatSort) matSort: MatSort;
    @ViewChild('filtersContainer', { read: ViewContainerRef }) filterContainer: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {}

    ngOnInit(): void {
        if (!this.gridName) { throw new Error('Attribute \'gridName\' is required.'); }
        if (!this.config) { throw new Error('Attribute \'config\' is required.'); }
        if (!this.config.columns.some((x) => x.searchable)) { throw new Error('At least one column must be searchable.'); }

        this.addFilterComponents();
        this.initializeState();
        this.setSearchFormControl();
        this.setColumnsContent();
        this.applySort();
    }

    public fetch() {
        this.rememberGridState();

        // encode current state as base-64 encoded ASCII string
        const encodedQuery = btoa(JSON.stringify(this.state));

        let params: HttpParams = new HttpParams();
        params = params.append('query', encodeURI(encodedQuery));

        if (this.config.source instanceof Object) {
            const fetchingService = this.config.source as GridService;

            fetchingService.fetch(params).subscribe((result: any) => {
                if (!result.data && !result.totalItems) {
                    { throw new Error('Service result should be of type GridData.'); }
                }
                this.sortedData = result.data;
                this.totalItems = result.totalItems;
            });
        }
    }

    public upsertFilter(filter: GridFilter) {
        if (this.state.filters.some(x => x.name === filter.name)) {
            const filterIndex = this.state.filters.findIndex(x => x.name === filter.name);
            this.state.filters[filterIndex] = filter;
        } else {
            this.state.filters.push(filter);
        }
        this.resetPage();
    }

    public removeFilter(name: string) {
        if (this.state.filters.some(x => x.name === name)) {
            const savedFilter = this.state.filters.find(x => x.name === name);
            this.state.filters = this.state.filters.filter(x => x !== savedFilter);
        }
        this.resetPage();
    }

    private addFilterComponents() {
        if (!this.config.filters) {
            this.config.filters = new Array<any>();
        }

        this.config.filters.forEach((filter: any) => {
            const factory = this.resolver.resolveComponentFactory(filter);
            const componentRef = this.filterContainer.createComponent(factory);
            const filterComponent = componentRef.instance as AbstractGridFilter;
            filterComponent.grid = this;
            this.customFilters.push(filterComponent);
        });
    }

    private initializeState() {
        const savedState = localStorage.getItem(this.gridName);

        if (savedState) {
            this.state = JSON.parse(savedState) as GridState;
            this.state.page = 1;
            this.restoreFilters();
        } else {
            this.state = {
                searchColumns: this.getSearchColumns(),
                query: '',
                orderDirection: 'asc',
                orderBy: '',
                page: 1,
                pageSize: this.config.pageSize,
                filters: new Array<GridFilter>()
            };
        }
    }

    private setSearchFormControl() {
        this.searchFormControl.setValue(this.state.query);
        this.searchFormControl.valueChanges.pipe(
            debounceTime(250),
            distinctUntilChanged(),
            // Skip the first value since it will trigger
            skip(1)
        )
        .subscribe(() => {
            this.state.query = this.searchFormControl.value;
            this.resetPage();
            this.fetch();
        });
    }

    private setColumnsContent() {
        this.config.columns.forEach(columnConfig => {
            if (columnConfig.content instanceof TemplateRef) {
                columnConfig.templateContent = columnConfig.content;
            }
            if (typeof columnConfig.content === 'function') {
                columnConfig.functionContent = columnConfig.content;
            }
        });
    }

    private applySort() {
        // Applying sort will trigger first fetch
        this.matSort.sort({
            id: this.state.orderBy,
            start: this.state.orderDirection,
            disableClear: true,
        });
    }

    private rememberGridState() {
        localStorage.setItem(this.gridName, JSON.stringify(this.state));
    }

    private restoreFilters() {
        this.state.filters.forEach((filter) => {
            const filterComponent = this.customFilters.find(x => x.name === filter.name);
            if (filterComponent) {
                filterComponent.savedFilter = filter;
            }
        });
    }

    private getSearchColumns(): string[] {
        return this.config.columns.filter(x => x.searchable).map(x => x.name) as string[];
    }

    private resetPage() {
        this.state.page = 1;
    }

    clearSearchInput() {
        this.state.query = '';
        this.searchFormControl.setValue(this.state.query);
    }

    get sortableColumns(): GridColumn[] {
        return this.config.columns.filter(x => x.sortable);
    }

    get enabledColumns(): GridColumn[] {
        return this.config.columns.filter(x => !x.disabled);
    }

    get mobileViewHeaderColumn(): GridColumn {
        return this.config.columns[this.config.mobileViewColumnIndex];
    }

    onSortChange(sort: Sort) {
        this.state.orderBy = sort.direction ? sort.active : '';
        this.state.orderDirection = sort.direction ? sort.direction : 'asc';
        this.fetch();
    }

    onSortDropdownChange(value: any) {
        this.state.orderBy = value ? value : '';
        this.applySort();
    }

    onSortDirectionButtonChange() {
        this.state.orderDirection = this.state.orderDirection  === 'asc' ? 'desc' : 'asc';
        this.applySort();
    }

    onPageChange(event: PageEvent) {
        this.state.page = event.pageIndex + 1;
        this.fetch();
    }
}
