import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateImage } from '../interfaces/user/update-image.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  @Output() imageChanged: EventEmitter<string> = new EventEmitter();

  updateImage(updateImage: UpdateImage) {
    const formData = new FormData();
    formData.append('file', updateImage.file);
    return this.http
      .put<string>(
        `${base_url}${updateImage.type}/upload/image/${updateImage.id}`,
        formData
      )
      .pipe(
        tap((res: any) => {
          this.imageChanged.next(res.avatar);
        })
      );
  }
}
