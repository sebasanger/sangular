import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}
  handleError(errorResponse: HttpErrorResponse): void {
    // console.log(errorResponse);
    if (errorResponse.error != null && errorResponse.status == 401) {
      Swal.fire(
        'Error',
        errorResponse.error.message != null
          ? errorResponse.error.message
          : 'Unknown error',
        'error'
      );
    } else {
      throw errorResponse;
    }
  }
}
