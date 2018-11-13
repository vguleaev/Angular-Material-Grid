import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { GridConfig } from 'grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  gridOptions: GridConfig = new GridConfig();

  constructor(private dataService: DataService) {
    this.gridOptions = {
      searchPlaceholder: 'Search by name, username or email..',
      source: this.dataService,
      pageSize: 5,
      mobileViewColumnIndex: 1,
      rememberState: false,
      filters: [],
      columns: [{
        name: 'id',
        label: 'Id',
        searchable: true,
        sortable: true,
        disabled: false,
        content: (item: any) => item.id
      },
      {
        name: 'name',
        label: 'Name',
        searchable: true,
        sortable: true,
        disabled: false,
        content: (item: any) => item.name
      },
      {
        name: 'email',
        label: 'Email',
        searchable: true,
        sortable: true,
        disabled: false,
        content: (item: any) => item.email
      },
      {
        name: 'company',
        label: 'Company',
        searchable: false,
        sortable: false,
        disabled: false,
        content: (item: any) => item.company.name
      }
    ]} as GridConfig;
  }

  ngOnInit() {
  }
}
