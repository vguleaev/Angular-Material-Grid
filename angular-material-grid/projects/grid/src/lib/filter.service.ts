import { GridFilter } from './grid-filter';

export interface FilterService {
  upsertFilter(filter: GridFilter);
  removeFilter(name: string);
  fetch();
}
