import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatExpansionModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatCardModule
  ],
  declarations: [GridComponent],
  exports: [GridComponent]
})
export class DynamicGridModule { }
