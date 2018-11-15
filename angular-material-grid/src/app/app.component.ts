import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from './services/data.service';
import { GridConfig } from 'grid';
import { PositionFilterComponent } from './filters/position-filter/position-filter.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { Positions } from './constatns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;

  gridOptions: GridConfig = new GridConfig();

  constructor(private dataService: DataService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.gridOptions = {
      searchPlaceholder: 'Search by name, username or email..',
      source: this.dataService,
      pageSize: 5,
      mobileViewColumnIndex: 1,
      rememberState: false,
      filters: [PositionFilterComponent],
      columns: [
        {
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
        },
        {
          name: 'title',
          label: 'Title',
          searchable: false,
          sortable: false,
          disabled: false,
          content: (item: any) => Positions[item.title]
        },
        {
          name: 'phone',
          label: 'Phone',
          searchable: false,
          sortable: false,
          disabled: false,
          content: (item: any) => item.phone
        },
        {
          name: 'actions',
          label: '',
          searchable: false,
          sortable: false,
          disabled: false,
          content: this.actionsTemplate
        }
      ]
    } as GridConfig;
  }

  public deleteEntity(entity: any) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      panelClass: 'small-modal-dialog',
      closeOnNavigation: true,
      autoFocus: false,
      data: {
        title: 'Are you sure you want to delete it?',
        content: ''
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        alert('Entity deleted');
      }
    });
  }
}
