# Angular Material Grid
This is an alternative solution for standard [mat-table](https://material.angular.io/components/table/overview), made to simplify and minimize fetch and display data in a grid. It can remember currrent grid state, take one single config object to control columns, sort, order, cell display format and pagination.You can apply additional custom filters with its logic, change column display format with
any rich template. Mobile view is also supported.

See the [demo here.](https://vguleaev.github.io/Angular-Material-Grid/)

![example](https://pp.userapi.com/c847120/v847120416/b2574/SIM9K3ysiW8.jpg)

## Getting started

Install package via npm
```
npm install @vguleaev/angular-material-grid
```

Requires Angular Material to be installed. 
```
npm install @angular/material @angular/cdk
```

Import module with 
```
import { NgMatAutocompleteModule } from '../../node_modules/@vguleaev/angular-material-autocomplete';
```

Use component somewhere in html template
```
<ng-mat-grid> </ng-mat-grid>
```
 ## Documentation
 
 In order to setup a component you must provide a config object. GridConfig class has following properties:
 
### GridConfig ###
 
 ```
 export class GridConfig {
    searchPlaceholder = 'Search';
    pageSize = 10;
    source:  GridService;
    columns: GridColumn[];
    filters: Type<AbstractGridFilter>[];
    mobileViewColumnIndex = 0;
    rememberState = false;
}
```
 
| Property        | Default Value   |  Description |
| -------------    | --------------  | ------------- |
| searchPlaceholder| "Search"       | Placeholder for search input. |
| pageSize         | 10             | Number. Represents how many items will be displayed per one page. <br/> Even page size is controlled on the server this number need to correct display paginator. |
| source           |   null        |  Service which implements **GridService** inreface. <br/> <br/> Interface has only one method called 'fetch' that supose to make a request and return at Observable of type **GridData**. <br/> `fetch(params?: HttpParams): Observable<GridData>` |
| columns          | null          | Array of **GridColumn**. Contains all the columns and their config. GridColumn has such properties like name, label, searchable, sortable, disabled and content. |
| filters          | null          | Array of **AbstractGridFilter**. Create a component that implements AbstractGridFilter interface to change the GridState for specific cases. |
| mobileViewColumnIndex | 0        | Number. Index of column in columns array. Specifies column will be displayed as card header in mobile view. |
| rememberState | false | Boolean. When active all the changes in GridState will be saved in localStorage and when you come back to grid page filters, sorting and query can be restored. Dont forget to remove state item if you need to clear grid state.|

### GridState ###

GridState object is used to fetch items from server and remember/restore state.

When any change in grid state is performed (search input, sort or page change) current GridState object is encoded with `btoa()` and 
a GET request is done with query param called **'query'** containing state hash.

e.g. GET `http://yoursite/api/grid?query=OBJECT_HASH_HERE`


```
export class GridState {
    query: string;
    searchColumns: Array<string>;
    orderDirection: 'asc' | 'desc';
    orderBy: string;
    page: number;
    pageSize: number;
    filters: Array<GridFilter> = new Array<GridFilter>();
}
```

| Property        | Default Value   |  Description |
| -------------    | --------------  | ------------- |
| query            |  ""             | String. Current text in search input. |
| searchColumns    |  null           | Array<string>. Columns names (not labels) that are marked as `searchable`. Component collects all the names of searchable columns and put them into array. The backend api should implement the logic when text from `query` contains in any of these columns. It represents search by multimple properties. `(firstName == 'Vlad' OR lastName == 'Vlad')` |
| orderDirection   | 'asc'           |  Can be two strings `'asc' or 'desc'`. Represents order direction. |
| orderBy          | ""              | String. Column name by which order is done. |
| page             | 0               | Number. Current page index. |
| pageSize         |  0              | Number. Can be ignored on the backend if size is fixed. When size if fixed you should set the same page size on the GridConfig and on the backend api.|
| filters          | [ ]              | Array of **GridFilter**. Contains all custom filters if they exist. GridFilter has properties like column name, value and type. The backend api should implement the logic along standard search to support additional filters.<br/> <br/> e.g. Show only items with type == 'New'. <br/> In such case TypeFilter has columName = 'type' and value = 'New'.  It represents filter by additional conditions. `(name == 'Vlad' AND type == 'New')` | 
 
 ### GridFilter ### 
 
 ```
 export class GridFilter {
    name: string;
    columnName: string;
    value: string;
    type: GridFilterType;
}

export enum GridFilterType {
    Equals = 1,
    Contains = 2,
    Between = 3
}
```






