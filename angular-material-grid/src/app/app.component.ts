import { Component } from '@angular/core';
import { GridConfig } from './grid/grid-config';
import { GridColumn } from './grid/grid-column';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  gridOptions: GridConfig = new GridConfig();

  constructor(private tableService: TableService) {

    this.gridOptions.searchPlaceholder = 'Search by everything..';
    this.gridOptions.source = tableService;
    this.gridOptions.pageSize = 10;
    this.gridOptions.columns = new Array<GridColumn>();
    this.gridOptions.columns.push({
      name: 'id',
      label: 'Id',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.id
    });
    this.gridOptions.columns.push({
      name: 'name',
      label: 'Name',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.name
    });
    this.gridOptions.columns.push({
      name: 'price',
      label: 'Price',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.price + ' $'
    });
    this.gridOptions.columns.push({
      name: 'comment',
      label: 'Comments',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.comment
    });
  }
}
