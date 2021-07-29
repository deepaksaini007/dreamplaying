import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryMaster, CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { TeamRequestData } from 'src/app/core/data-models/teams/team.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  allCategories$!:Observable<CategoryMaster|undefined>;
  formData!:FormGroup;
  base64Thumbnail:string|undefined;


  constructor(public dialogRef: MatDialogRef<AddTeamComponent>,@Inject(MAT_DIALOG_DATA) public teamRequest:TeamRequestData,private storeService:StoreService){}

  ngOnInit(): void {
    this.allCategories$ = this.storeService.getAllCategories$;
    this.storeService.loadAllCategories();
    this.formData = new FormGroup({
      category_details: new FormControl(null,[Validators.required]),
      team_name: new FormControl(null,[Validators.required]),
      category_master_id:new FormControl(null,[Validators.required])
    })
    this.listenForCategoryChange()
  }
  closeDialog(){
    this.dialogRef.close()
  }
  objectComparisonFunction = function (option:CategoryRequestData, value:CategoryRequestData): boolean {
    if (option && value) {
      return option.guid === value.guid;
    }
    return false;
  };
  listenForCategoryChange(){
    this.formData.get('category_details')?.valueChanges.subscribe(val=>{
      if(val){
        const categorySelected = val as CategoryRequestData;
        this.formData.patchValue({category_master_id: categorySelected.category_master_id})
        if(!categorySelected.category_master_id){
          this.allCategories$.subscribe(val=>{
            if(val){
              const categ = val.games.find(a=>a.cat_display_name_en===categorySelected.cat_display_name_en);
              if(categ){
                this.formData.patchValue({category_master_id: categ.category_master_id})

              }
            }
          })
        }
      }
    })
  }

  onImageChanged(image:string){
    this.base64Thumbnail = image;
  }

  submitData(){
    this.dialogRef.close({
      status:true,
      data:{...this.formData.value,team_logo:this.base64Thumbnail}
    })
  }
}
