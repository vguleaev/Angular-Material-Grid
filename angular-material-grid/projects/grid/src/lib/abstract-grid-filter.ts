import { GridComponent } from './grid.component';
import { GridFilter } from './grid-filter';
import { FilterService } from './filter.service';

export interface AbstractGridFilter {
  filterService: FilterService;
  name: string;
  savedFilter: GridFilter;
}
