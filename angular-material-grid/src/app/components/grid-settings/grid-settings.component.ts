import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { GridColumn, GridConfig } from '@vguleaev/angular-material-grid';

@Component({
  selector: 'app-grid-settings',
  templateUrl: './grid-settings.component.html',
  styleUrls: ['./grid-settings.component.scss']
})
export class GridSettingsComponent implements OnInit {
  @Input()
  public gridName: '';
  @Input()
  public gridOptions: GridConfig;
  constructor() {}

  public ngOnInit() {
    if (this.gridOptions && this.gridName) {
      this.restoreGridSettings();
    } else {
      throw new Error('GridOptions and GridName are required for GridSettingsComponent');
    }
  }

  public toggleColumn($event: any, column: GridColumn) {
    $event.stopPropagation();
    column.disabled = !column.disabled;

    if (!this.gridOptions.columns.filter(x => !x.disabled && x.label).length) {
      column.disabled = !column.disabled;
    }

    this.rememberGridSettings();
  }

  private rememberGridSettings() {
    const displayColumnsNames = this.gridOptions.columns.filter(x => !x.disabled && x.label).map(x => x.name);
    localStorage.setItem(this.gridName + 'Settings', JSON.stringify({ displayColumnsNames }));
  }

  private restoreGridSettings() {
    const gridSettings = localStorage.getItem(this.gridName + 'Settings');
    if (gridSettings) {
      const displayColumnsNames: string[] = JSON.parse(gridSettings).displayColumnsNames;

      this.gridOptions.columns
        .filter(x => x.label)
        .forEach((column: GridColumn) => {
          const shouldBeDisplayed = !!displayColumnsNames.find(x => x === column.name);
          column.disabled = !shouldBeDisplayed;
        });
    }
  }
}
