import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CategoryMaster, CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { NewsRequestData } from 'src/app/core/data-models/news/news.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  disableSelect = new FormControl(false);
  allCategories$!:Observable<CategoryMaster|undefined>;
  formData!:FormGroup;
  base64Thumbnail:string|undefined;
  isUrl:boolean|undefined;

  ckEditorConfig:CKEditor5.Config = {
    language:'hi'
  }
  onThumbnailAdded(event: string) {
    this.base64Thumbnail = event;
    this.isUrl  = false;
  }
  constructor(private spinnerService:NgxSpinnerService, public dialogRef: MatDialogRef<AddNewsComponent>,@Inject(MAT_DIALOG_DATA) public newsRequest:{news:NewsRequestData|undefined,categoryName:string|undefined},private storeService:StoreService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
    this.allCategories$ = this.storeService.getAllCategories$;
    this.storeService.loadAllCategories()
    this.formData = new FormGroup({
      category_details: new FormControl(null,[]),
      category_master_id: new FormControl(null,[Validators.required]),
      news_title_en: new FormControl(null,[Validators.required]),
      news_title_hn: new FormControl(null,[Validators.required]),
      news_decription_en: new FormControl('<strong>News Description in english</strong>',[Validators.required]),
      news_decription_hn: new FormControl('<strong>News Description in hindi</strong>',[Validators.required]),
      news_credits_by_en: new FormControl(null,[Validators.required]),
      news_credits_by_hn: new FormControl(null,[Validators.required]),
      published_on: new FormControl(null,[Validators.required])

    })
    this.listenForCategoryChange()
    if(this.newsRequest){
      if(this.newsRequest.news){
        this.base64Thumbnail = this.newsRequest.news.image_thumbnail;
        this.isUrl = this.newsRequest.news.image_thumbnail?.includes("http")
      }
      this.formData.patchValue({...this.newsRequest.news,category_details:{cat_display_name_en:this.newsRequest.categoryName}})
      if(this.newsRequest.news && !this.newsRequest.categoryName){
        this.formData.patchValue({category_details:{category_master_id:this.newsRequest.news.category_master_id}})
      }
    }
  }

  listenForCategoryChange(){
    this.formData.get('category_details')?.valueChanges.subscribe(val=>{
      if(val){
        const categorySelected = val as CategoryRequestData;
        this.formData.patchValue({category_master_id: categorySelected.category_master_id})
        if(!categorySelected.category_master_id){
          this.allCategories$.subscribe(val=>{
            if(val){
              const categ = val.news.find(a=>a.cat_display_name_en===categorySelected.cat_display_name_en);
              if(categ){
                this.formData.patchValue({category_master_id: categ.category_master_id})

              }
            }
          })
        }
      }
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }

  objectComparisonFunction = function (option:CategoryRequestData, value:CategoryRequestData): boolean {
    if (option && value) {
      if(option.cat_display_name_en && value.cat_display_name_en){
        return option.cat_display_name_en === value.cat_display_name_en;
      }
      if(option.category_master_id && value.category_master_id){
        return option.category_master_id === value.category_master_id;
      }
    }
    return false;
  };

  submitData(){
    this.spinnerService.show()
    delete this.formData.value['category_details']
    this.dialogRef.close({
      status:true,
      data: {...this.newsRequest.news,...this.formData.value,image_thumbnail:this.base64Thumbnail}
    })
  }
  public Editor = ClassicEditor;

}
