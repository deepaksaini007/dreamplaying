import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CategoryMaster, CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { StoryRequestData } from 'src/app/core/data-models/stories/stories.mode';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {
  disableSelect = new FormControl(false);
  constructor(private spinnerService:NgxSpinnerService,public dialogRef: MatDialogRef<AddStoryComponent>,@Inject(MAT_DIALOG_DATA) public storyRequest:{story:StoryRequestData|undefined,categoryName:string|undefined},private storeService:StoreService){}
  allCategories$!:Observable<CategoryMaster|undefined>;
  formData!:FormGroup;
  isUrl:boolean|undefined;
  ckEditorConfig:CKEditor5.Config = {
    language:'hi'
  }
  base64Thumbnail:string|undefined;
  ngOnInit(): void {
    this.spinnerService.hide()

    this.allCategories$ = this.storeService.getAllCategories$;
    this.storeService.loadAllCategories();
    this.formData = new FormGroup({
      category_details: new FormControl(null,[]),
      category_master_id: new FormControl(null,[Validators.required]),
      story_title_en: new FormControl(null,[Validators.required]),
      story_title_hn: new FormControl(null,[Validators.required]),
      story_decription_en: new FormControl('<strong>Story Description in english</strong>',[Validators.required]),
      story_decription_hn: new FormControl('<strong>Story Description in hindi</strong>',[Validators.required]),
      story_credits_by_hn: new FormControl(null,[Validators.required]),
      story_credits_by_en: new FormControl(null,[Validators.required]),
      published_on: new FormControl(null,[Validators.required])
    })

    this.listenForCategoryChange()
    if(this.storyRequest){
      if(this.storyRequest.story){
        this.base64Thumbnail = this.storyRequest.story.image_thumbnail;
        this.isUrl = this.storyRequest.story.image_thumbnail?.includes("http");
      }
      this.formData.patchValue({...this.storyRequest.story,category_details:{cat_display_name_en:this.storyRequest.categoryName}})
      if(this.storyRequest.story && !this.storyRequest.categoryName){
        this.formData.patchValue({category_details:{category_master_id:this.storyRequest.story.category_master_id}})
      }
    }

  }
  closeDialog() {
    this.dialogRef.close()
  }
  onThumbnailAdded(base64:string){
    this.base64Thumbnail = base64;
  }

  listenForCategoryChange(){
    this.formData.get('category_details')?.valueChanges.subscribe(val=>{
      if(val){
        const categorySelected = val as CategoryRequestData;
        this.formData.patchValue({category_master_id: categorySelected.category_master_id})
        if(!categorySelected.category_master_id){
          this.allCategories$.subscribe(val=>{
            if(val){
              const categ = val.stories.find(a=>a.cat_display_name_en===categorySelected.cat_display_name_en);
              if(categ){
                this.formData.patchValue({category_master_id: categ.category_master_id})

              }
            }
          })
        }
      }
    })
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

  public Editor = ClassicEditor;

  submitData(){
    this.spinnerService.show()
    delete this.formData.value['category_details']
    this.dialogRef.close({
      status:true,
      data: {...this.storyRequest.story,...this.formData.value,image_thumbnail:this.base64Thumbnail }
    })
  }

}
