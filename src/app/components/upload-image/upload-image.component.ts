import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateImage } from 'src/app/interfaces/update-image.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  public temporalImage: any = '';
  public actualImage: any = '';
  private updateImage: UpdateImage = { id: 0, type: null };
  constructor(
    private fileUploadService: FileUploadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  updateImageForm = this.fb.group({
    imageInput: [
      null,
      {
        validators: [Validators.required],
      },
    ],
  });

  ngOnInit(): void {
    this.updateImage.id = this.data.id;
    this.updateImage.type = this.data.type;
    this.actualImage = this.data.image;
  }

  changeImage(e: any) {
    const file: File = e.files[0];
    if (!file) {
      this.temporalImage = null;
      console.log('err');

      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.temporalImage = reader.result;
    };
    this.updateImage.file = file;
  }

  saveImage() {
    this.fileUploadService.updateImage(this.updateImage).subscribe(
      (res) => {
        Swal.fire('Great', 'Image changed', 'success');
      },
      (err) => {
        Swal.fire('Error', 'Error on change the image', 'error');
      }
    );
  }
}
