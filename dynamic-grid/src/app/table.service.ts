import { TableItem } from './tableItem';
import { HttpParams } from '../../node_modules/@angular/common/http';
import { AbstractGridService } from './grid/abstract-grid.service';
import { Injectable } from '../../node_modules/@angular/core';

@Injectable()
export class TableService implements AbstractGridService<any> {

    fetch(params?: HttpParams): Promise<any> {
      const result = [
          new TableItem(1, 'Product 1', 1200, 'Good quality'),
          new TableItem(2, 'Product 2', 990, 'Not very bad item'),
          new TableItem(3, 'Product 3', 500, 'I liked it'),
          new TableItem(4, 'Product 4', 400, 'Some very interesting and nice comment here'),
      ];

      return new Promise((resolve) => {
        resolve({data: result, totalItems: 4});
      });
    }
}
