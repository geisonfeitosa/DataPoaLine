import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogLoading } from './../shared/dialog-loading/dialog-loading.component';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private dialogRef: MatDialogRef<DialogLoading>;
    constructor(private dialog: MatDialog) { }


    start() {
        if (this.dialogRef) return;
        this.dialogRef = this.dialog.open(DialogLoading, {
            height: 'auto',
            width: 'auto',
            disableClose: true
        });

        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined;
        });
    }

    close() {
        if (this.dialogRef)
            this.dialogRef.close();
    }

}
