import { GridComponent } from './grid.component';
import { GridFilter } from './grid-filter';

export interface AbstractGridFilter {
  grid: GridComponent;
  name: string;
  savedFilter: GridFilter;
}
