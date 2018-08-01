import { Component } from '@angular/core';
import { GridConfig } from './grid/grid-config';
import { GridColumn } from './grid/grid-column';
import { TableService } from './table.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  gridOptions: GridConfig = new GridConfig();

  constructor(private dataService: DataService) {

    this.gridOptions.searchPlaceholder = 'Search by name, username or email..';
    this.gridOptions.source = dataService;
    this.gridOptions.pageSize = 5;
    this.gridOptions.mobileViewColumnIndex = 1;
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
      name: 'username',
      label: 'Username',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.username
    });
    this.gridOptions.columns.push({
      name: 'email',
      label: 'Email',
      searchable: true,
      sortable: true,
      disabled: false,
      content: (item: any) => item.email
    });
    this.gridOptions.columns.push({
      name: 'company',
      label: 'Company',
      searchable: false,
      sortable: false,
      disabled: false,
      content: (item: any) => item.company.name
    });
  }
}
