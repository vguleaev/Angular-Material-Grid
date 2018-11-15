import { TemplateRef } from '@angular/core';

export class GridColumn {
  name: string;
  label: string;
  searchable: boolean;
  sortable: boolean;
  content: any;
  disabled: boolean;

  // Do not use this for initialization
  templateContent?: TemplateRef<any>;
  functionContent?: (item: any) => string;
}
