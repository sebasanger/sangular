import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private _snackBar: MatSnackBar) {}
  handleError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error != null && errorResponse.status == 401) {
      Swal.fire(
        'Error',
        errorResponse.error.message != null
          ? errorResponse.error.message
          : 'Unknown error',
        'error'
      );
    } else if (errorResponse.error != null && errorResponse.status == 400) {
      const errorMessages = Object.values(errorResponse.error.errors);
      const errorKey = Object.keys(errorResponse.error.errors);

      for (let i = 0; i < errorKey.length; i++) {
        this._snackBar.open(errorKey[i] + ': ' + errorMessages[i] + ' ', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    } else {
      return;
    }
  }
}
