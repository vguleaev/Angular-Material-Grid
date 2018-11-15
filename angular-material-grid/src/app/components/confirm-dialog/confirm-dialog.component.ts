import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public content = '';
  public title = 'Confirm dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (data) {
      this.title = this.data.title ? data.title : this.title;
      this.content = this.data.content ? data.content : this.content;
    }
  }

  public ngOnInit() {}

  public save() {
    this.dialogRef.close(true);
  }

  public close() {
    this.dialogRef.close(false);
  }
}
