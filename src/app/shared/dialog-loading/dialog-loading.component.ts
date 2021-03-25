import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `<mat-spinner color="#43a047"></mat-spinner>`
})
export class DialogLoading {
  
  constructor(private dialogRef: MatDialogRef<DialogLoading>) { }

  close() {
    this.dialogRef.close();
  }

}