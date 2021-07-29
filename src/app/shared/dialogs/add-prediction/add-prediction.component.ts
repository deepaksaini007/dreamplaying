import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { PredictionRequestData } from 'src/app/core/data-models/prediction/prediction.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-prediction',
  templateUrl: './add-prediction.component.html',
  styleUrls: ['./add-prediction.component.scss'],
})
export class AddPredictionComponent implements OnInit {
  formData!: FormGroup;
  bsae64PredictionImage: string | undefined;
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  public Editor = ClassicEditor;

  constructor(
    private spinnerService:NgxSpinnerService,
    public dialogRef: MatDialogRef<AddPredictionComponent>,
    @Inject(MAT_DIALOG_DATA) public predictionRequest: PredictionRequestData,
    private storeService: StoreService
  ) {}

  

  ngOnInit(): void {
    this.spinnerService.hide()
    this.formData = new FormGroup({
      preview_text_en: new FormControl(
        '<strong>Preview Text in english</strong>',
        [Validators.required]
      ),
      preview_text_hn: new FormControl(
        '<strong>Preview Text in hindi</strong>',
        [Validators.required]
      ),
      prediction_image_url: new FormControl(null, [Validators.required]),
    });
  }
  onImageChanged(image: string) {
    this.bsae64PredictionImage = image;
    this.formData.patchValue({ prediction_image_url: image });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitData() {
    this.spinnerService.show()
    this.dialogRef.close({
      status: true,
      data: { ...this.predictionRequest, ...this.formData.value },
    });
  }
}
