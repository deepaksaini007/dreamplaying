import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryMaster, CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { FAQRequestData } from 'src/app/core/data-models/faq/faq.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<AddFaqComponent>,@Inject(MAT_DIALOG_DATA) public faqRequest:{faq:FAQRequestData|undefined,categoryName:string|undefined},private storeService:StoreService) { }

  formData!:FormGroup;
  allCategories$!:Observable<CategoryMaster|undefined>;

  ngOnInit(): void {
    this.allCategories$ = this.storeService.getAllCategories$;
    this.storeService.loadAllCategories()
    this.formData = new FormGroup({
      category_details: new FormControl(null,[]),
      category_master_id: new FormControl(null,[Validators.required]),
      faq_title_en:new FormControl(null,[Validators.required]),
      faq_title_hn:new FormControl(null,[Validators.required]),
      faq_decription_en:new FormControl(null,[Validators.required]),
      faq_decription_hn:new FormControl(null,[Validators.required])


    })
    this.listenForCategoryChange()
    if(this.faqRequest){

      this.formData.patchValue({...this.faqRequest.faq,category_details:{cat_display_name_en:this.faqRequest.categoryName}})
      if(this.faqRequest.faq && !this.faqRequest.categoryName){
        this.formData.patchValue({category_details:{category_master_id:this.faqRequest.faq.category_master_id}})
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

  submitData(){
    delete this.formData.value['category_details']
    this.dialogRef.close({
      status:true,
      data: {...this.faqRequest.faq,...this.formData.value}
    })
  }
  closeDialog() {
    this.dialogRef.close()
  }

}
