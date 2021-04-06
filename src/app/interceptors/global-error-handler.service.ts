import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}
  handleError(errorResponse: HttpErrorResponse): void {
    console.log(errorResponse);
    const message = errorResponse.error.message || '';
    Swal.fire('Error', message, 'error');
  }
}
