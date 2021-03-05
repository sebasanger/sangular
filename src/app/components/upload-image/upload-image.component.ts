import { Component, Inject, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  public imageToUpload: File;
  public temporalImage: any = '';
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
    console.log(this.data.type);
    console.log(this.data.id);
  }

  onSubmit() {
    console.log(this.updateImageForm.controls.imageInput.value);
  }
}
