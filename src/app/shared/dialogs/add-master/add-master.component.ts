import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllMasterAppData } from 'src/app/core/data-models/master-app-data';
import { ValidatorsService } from 'src/app/core/services/validators/validators.service';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.scss']
})
export class AddMasterComponent implements OnInit {
  constructor(
    public validatorService:ValidatorsService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialogRef<AddMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { appData: AllMasterAppData }
  ) {}

  appFormGroup!: FormGroup;
  showPublishedOn:boolean = false;

  ngOnInit(): void {
    this.spinnerService.hide();
    this.appFormGroup = new FormGroup({
      app_name: new FormControl(null, [Validators.required]),
      package_name: new FormControl(null, [Validators.required]),

      banner_id: new FormControl(null, [Validators.required]),
      banner_id1: new FormControl(null, [Validators.required]),
      interstitial_id: new FormControl(null, [Validators.required]),
      console_id: new FormControl(null, [Validators.required]),
      console_password: new FormControl(null, [Validators.required]),
      contact_phone: new FormControl(null, [Validators.required]),
      click_count: new FormControl(null, [Validators.required]),
      native_add_id: new FormControl(null),
      app_logo_drive_link: new FormControl(null),
      privacy_policy_site_link: new FormControl(null),
      contact_email: new FormControl(null, [Validators.required]),
      status: new FormControl('Added', [Validators.required]),
      published_on:new FormControl(null,[])
    });
    if (this.dialogData) {
      this.appFormGroup.patchValue({ ...this.dialogData.appData });
      if(this.appFormGroup.get('status')?.value==='Published'){
        this.showPublishedOn = true;

      }
    }
    this.appFormGroup.get('status')?.valueChanges.subscribe(data=>{
      if(data && data==='Published'){
        this.showPublishedOn = true;
      }else{
        this.appFormGroup.get('published_on')?.reset();
      }
    })
  }
  closeDialog() {
    this.dialog.close();
  }

  submitData() {
    this.spinnerService.show();
    this.dialog.close({
      status: true,
      data: {
        ...this.dialogData?.appData,
        ...this.appFormGroup.value,
        status: this.dialogData &&  this.dialogData.appData
          ? this.appFormGroup.value['status']
          : 'Added',
      },
    });
  }
}
