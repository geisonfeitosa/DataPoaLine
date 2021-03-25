import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(public snackBar: MatSnackBar) {}

    openSuccess(message: string) {
      this.snackBar.open(message, 'Fechar', {
        duration: 7000,
        panelClass: "snack-bar-success"
      });
    }
  
    openAlert(message: string) {
      this.snackBar.open(message, 'Fechar', {
        duration: 7000,
        panelClass: "snack-bar-alert"
      });
    }
  
    openError(message: string) {
      this.snackBar.open(message, 'Fechar', {
        duration: 7000,
        panelClass: "snack-bar-error"
      });
    }

}
