# Angular Material Grid
This is an alternaite solution for standard [mat-table](https://material.angular.io/components/table/overview), made to simplify and minimize fetch and display data in a grid. It can remember currrent grid state in local storage, take a one single config object that represents search columns and sort, apply additional custom filters with its logic, format any column display format individual with template render.

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
