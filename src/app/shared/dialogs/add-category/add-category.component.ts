import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,@Inject(MAT_DIALOG_DATA) public categoryRequest:CategoryRequestData) { }
  formData!:FormGroup
  base64Thumbnail:string|undefined;
  isUrl:boolean|undefined;
  ngOnInit(): void {
    this.formData = new FormGroup({
      cat_type:new FormControl("story",[Validators.required]),
      cat_display_name_en:new FormControl(null,[Validators.required]),
      cat_display_name_hn: new FormControl(null,[Validators.required]),
      category_url:new  FormControl(null,this.categoryRequest.cat_type==='banner'?[Validators.required]:[])
    })
    if(this.categoryRequest){
      this.formData.patchValue({...this.categoryRequest})
    }
  }
  closeDialog(){
    this.dialogRef.close()
  }
  onThumbnailAdded(base64:string){
    this.base64Thumbnail = base64;
  }

  // submitData(){
  //   this.dialogRef.close({
  //     status:true,
  //     data:this.formData.value
  //   })
  // }

  submitData(){
    this.dialogRef.close({
      status:true,
      data:{...this.formData.value,category_image:this.base64Thumbnail}
    })
  }
}
