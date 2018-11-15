import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { CommonModule } from '../../node_modules/@angular/common';
import { TableService } from './table.service';
import {
  MatSortModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatTabsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatMenuModule,
  MatListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './services/data.service';
import { NgMatGridModule } from 'grid';
import { PositionFilterComponent } from './filters/position-filter/position-filter.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { GridSettingsComponent } from './components/grid-settings/grid-settings.component';

@NgModule({
  declarations: [AppComponent, PositionFilterComponent, ConfirmDialogComponent, GridSettingsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMatGridModule,
    // mat
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule
  ],
  providers: [TableService, DataService],
  bootstrap: [AppComponent],
  entryComponents: [PositionFilterComponent, ConfirmDialogComponent]
})
export class AppModule {}
