import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { AddPredictionComponent } from '../add-prediction/add-prediction.component';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/core/services/store-service/store.service';
import { CategoryMaster, CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { Observable } from 'rxjs';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { TeamData, TeamRequestData } from 'src/app/core/data-models/teams/team.model';
import { DreamTimePipe } from '../../pipes/dreamTime/dream-time.pipe';
import { DateTime } from 'luxon';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss'],
})
export class AddMatchComponent implements OnInit {
  allCategories$!:Observable<CategoryMaster|undefined>;
  teamMasterData$!:Observable<TeamData|undefined>;

  formData!: FormGroup;
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  public Editor = ClassicEditor;

  constructor( private spinnerService:NgxSpinnerService,public dialogRef: MatDialogRef<AddMatchComponent>,private storeService:StoreService) {}

  timePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: "#db1d29",
    },
    dial: {
      dialBackgroundColor: "#db1d29",
    },
    clockFace: {
      clockHandColor: "#db1d29",

      // clockFaceTimeInactiveColor: '#fff'
    },
  };

  ngOnInit(): void {
    this.spinnerService.hide()
    this.allCategories$ = this.storeService.getAllCategories$;
    this.teamMasterData$ = this.storeService.getAllTeams$;
    this.storeService.loadAllCategories();
    this.storeService.loadAllTeams()
    this.formData = new FormGroup({
      category_master_id: new FormControl(null, [Validators.required]),
      category_details: new FormControl(null, [Validators.required]),
      match_location: new FormControl(null, [Validators.required]),
      match_date: new FormControl(null, [Validators.required]),
      match_time: new FormControl(null, [Validators.required]),
      match_title_en: new FormControl(null, [Validators.required]),
      match_title_hn: new FormControl(null, [Validators.required]),
      match_name_en: new FormControl(null, [Validators.required]),
      match_name_hn: new FormControl(null, [Validators.required]),
      teamADetails: new FormControl(null, [Validators.required]),
      teamBDetails: new FormControl(null, [Validators.required]),
      team_left_name: new FormControl(null, [Validators.required]),
      team_left_logo: new FormControl(null, [Validators.required]),

      team_right_name: new FormControl(null, [Validators.required]),

      team_right_logo: new FormControl(null, [Validators.required]),
    });
    this.listenForCategoryChange()
    this.listenForTeamAChange()
    this.listenForTeamBChange()
  }
  objectComparisonFunction = function (option:CategoryRequestData, value:CategoryRequestData): boolean {
    if (option && value) {
      return option.guid === value.guid;
    }
    return false;
  };
  objectComparisonFunctionTeam = function (option:TeamData, value:TeamData): boolean {
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
  listenForTeamAChange(){
    this.formData.get('teamADetails')?.valueChanges.subscribe(val=>{
      if(val){
        const teamSelected = val as TeamRequestData;
        this.formData.patchValue({team_left_name: teamSelected.team_name,team_left_logo:teamSelected.team_logo})
      }
    })
  }
  listenForTeamBChange(){
    this.formData.get('teamBDetails')?.valueChanges.subscribe(val=>{
      if(val){
        const teamSelected = val as TeamRequestData;
        this.formData.patchValue({team_right_name: teamSelected.team_name,team_right_logo:teamSelected.team_logo})
      }
    })
  }
  get leftTeamImage(){
   return this.formData.get('team_left_logo')?.value;
  }
  get rightTeamImage(){
    return this.formData.get('team_right_logo')?.value;
   }
  closeDialog() {
    this.dialogRef.close();
  }


  submitData(){
    delete this.formData.value['teamBDetails'];
    delete this.formData.value['teamADetails'];
    delete this.formData.value['category_details'];
      this.spinnerService.show()

    this.dialogRef.close({
      status:true,
      data: {
        ...this.formData.value,
        match_time:DateTime.fromFormat(this.formData.value['match_time'],"h:mm a",{zone:'Asia/Kolkata'}).toString().split("+")[0] + "Z",
      }
    })
  }
}
