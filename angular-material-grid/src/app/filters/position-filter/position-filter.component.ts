import { Component, OnInit } from '@angular/core';
import { AbstractGridFilter, GridFilter, GridFilterType, FilterService } from 'grid';
import { FormControl } from '@angular/forms';
import { Positions } from 'src/app/constatns';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.css']
})
export class PositionFilterComponent implements AbstractGridFilter, OnInit {
  public filterService: FilterService;
  public name: string;
  public savedFilter: GridFilter;

  public titleSelect = new FormControl();
  public positionsList: { value: string; label: string }[] = [];

  constructor() {
    this.name = 'PositionFilter';
    this.getPositions();
  }

  ngOnInit() {
    if (!this.filterService) {
      throw new Error('FilterService reference is required for filter.');
    }

    if (this.savedFilter) {
      this.titleSelect.setValue(JSON.parse(this.savedFilter.value) as string[]);
    }

    this.titleSelect.valueChanges.subscribe((values: any[]) => {
      if (values && values.length > 0) {
        const filter = new GridFilter();
        filter.name = this.name;
        filter.columnName = 'position';
        filter.value = JSON.stringify(values.map(x => x.value));
        filter.type = GridFilterType.Equals;

        this.filterService.upsertFilter(filter);
        this.filterService.fetch();
      } else {
        this.filterService.removeFilter(this.name);
        this.filterService.fetch();
      }
    });
  }

  private getPositions(): any {
    for (const key in Positions) {
      if (Positions.hasOwnProperty(key)) {
        const position = Positions[key];
        this.positionsList.push({ value: key, label: position });
      }
    }
  }
}
