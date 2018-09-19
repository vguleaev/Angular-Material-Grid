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
 
###GridConfig###
 
| Attribute        | Default Value   |  Description |
| -------------    | --------------  | ------------- |
| searchPlaceholder| 'Search'       | Placeholder for search input. |
| pageSize         | 10             | Number. Represents how many items will be displayed per one page. <br/> Even page size is controlled on the server this number need to correct display paginator. |
| source           |   null        |  Service which implements **GridService** inreface. <br/> <br/> Interface has only one method called 'fetch' that supose to make a request and return at Observable of type **GridData**. fetch(params?: HttpParams): Observable<GridData> |
| columns          | null          | Array of **GridColumn**. Contains all the columns and their config. GridColumn has such properties like name, label, searchable, sortable, disabled and content. |
| filters          | null          | Array of **AbstractGridFilter**. Create a component that implements AbstractGridFilter interface to change the GridState for specific cases. |
| mobileViewColumnIndex | 0        | Number. Index of column in columns array. Specifies column will be displayed as card header in mobile view. |
| rememberState | false | Boolean. When active all the changes in GridState will be saved in localStorage and when you come back to grid page filters, sorting and query can be restored. Dont forget to remove state item if you need to clear grid state.|

###GridState###

GridState object is used to fetch items from server and remember/resotre state from loscalStorage.


