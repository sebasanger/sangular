import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdateImage } from '../interfaces/update-image.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  updateImage(updateImage: UpdateImage) {
    const formData = new FormData();
    formData.append('file', updateImage.file);
    return this.http.put<void>(
      `${base_url}${updateImage.type}/upload/image/${updateImage.id}`,
      formData
    );
  }
}
