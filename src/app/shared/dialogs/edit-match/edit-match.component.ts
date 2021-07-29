import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Observable } from 'rxjs';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  CategoryMaster,
  CategoryRequestData,
} from 'src/app/core/data-models/category/game_category.model';
import {
  TeamData,
  TeamRequestData,
} from 'src/app/core/data-models/teams/team.model';
import { StoreService } from 'src/app/core/services/store-service/store.service';
import { PredictionRequestData } from 'src/app/core/data-models/prediction/prediction.model';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.scss'],
})
export class EditMatchComponent implements OnInit {
  allCategories$!: Observable<CategoryMaster | undefined>;
  teamMasterData$!: Observable<TeamData | undefined>;

  formData!: FormGroup;
  bsae64PredictionImage: string | undefined;
  isUrl: boolean | undefined = false;
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  public Editor = ClassicEditor;

  constructor(
    private spinnerService: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: PredictionRequestData,
    public dialogRef: MatDialogRef<EditMatchComponent>,
    private storeService: StoreService
  ) {}

  timePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#db1d29',
    },
    dial: {
      dialBackgroundColor: '#db1d29',
    },
    clockFace: {
      clockHandColor: '#db1d29',

      // clockFaceTimeInactiveColor: '#fff'
    },
  };

  onImageChanged(image: string) {
    this.bsae64PredictionImage = image;
    this.isUrl = false;
    this.formData.patchValue({ prediction_image_url: image });
  }

  ngOnInit(): void {
    this.spinnerService.hide();
    this.allCategories$ = this.storeService.getAllCategories$;
    this.teamMasterData$ = this.storeService.getAllTeams$;
    this.storeService.loadAllCategories();
    this.storeService.loadAllTeams();
    this.formData = new FormGroup({
      category_master_id: new FormControl(null, [Validators.required]),
      category_details: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
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
      preview_text_en: new FormControl(
        '<strong>Preview Text in english</strong>',
        [Validators.required]
      ),
      preview_text_hn: new FormControl(
        '<strong>Preview Text in hindi</strong>',
        [Validators.required]
      ),
      prediction_image_url: new FormControl(null, [Validators.required]),

      team_right_logo: new FormControl(null, [Validators.required]),
    });
    this.listenForCategoryChange();
    this.listenForTeamAChange();
    this.listenForTeamBChange();
    if (this.data) {
      this.bsae64PredictionImage = this.data.prediction_image_url;
      this.isUrl = this.data.prediction_image_url?.includes('http');
      this.formData.patchValue({
        ...this.data,
        category_details: { category_master_id: this.data.category_master_id },
        teamADetails: {
          team_name: this.data.team_left_name,
          team_logo: this.data.team_left_logo,
        },
        teamBDetails: {
          team_name: this.data.team_right_name,
          team_logo: this.data.team_right_logo,
        },
        match_time: this.timeValidaton(this.data.match_time),
      });
    }
  }
  timeValidaton(date: Date | undefined): string | null {
    if (date) {
      date = new Date(date);
      return new DatePipe('en_us').transform(date, 'hh:mm a');
    }
    return null;
  }
  objectComparisonFunction = function (
    option: CategoryRequestData,
    value: CategoryRequestData
  ): boolean {
    if (option && value) {
      if (option.cat_display_name_en && value.cat_display_name_en) {
        return option.cat_display_name_en === value.cat_display_name_en;
      }
      if (option.category_master_id && value.category_master_id) {
        return option.category_master_id === value.category_master_id;
      }
    }
    return false;
  };
  objectComparisonFunctionTeam = function (
    option: TeamRequestData,
    value: TeamRequestData
  ): boolean {
    if (option && value) {
      if (option.team_name && value.team_name) {
        return option.team_name === value.team_name;
      }
      if (option.guid && value.guid) {
        return option.guid === value.guid;
      }
    }
    return false;
  };
  listenForCategoryChange() {
    this.formData.get('category_details')?.valueChanges.subscribe((val) => {
      if (val) {
        const categorySelected = val as CategoryRequestData;
        this.formData.patchValue({
          category_master_id: categorySelected.category_master_id,
        });
        if (!categorySelected.category_master_id) {
          this.allCategories$.subscribe((val) => {
            if (val) {
              const categ = val.games.find(
                (a) =>
                  a.cat_display_name_en === categorySelected.cat_display_name_en
              );
              if (categ) {
                this.formData.patchValue({
                  category_master_id: categ.category_master_id,
                });
              }
            }
          });
        }
      }
    });
  }
  listenForTeamAChange() {
    this.formData.get('teamADetails')?.valueChanges.subscribe((val) => {
      if (val) {
        const teamSelected = val as TeamRequestData;
        this.formData.patchValue({
          team_left_name: teamSelected.team_name,
          team_left_logo: teamSelected.team_logo,
        });
      }
    });
  }
  listenForTeamBChange() {
    this.formData.get('teamBDetails')?.valueChanges.subscribe((val) => {
      if (val) {
        const teamSelected = val as TeamRequestData;
        this.formData.patchValue({
          team_right_name: teamSelected.team_name,
          team_right_logo: teamSelected.team_logo,
        });
      }
    });
  }
  get leftTeamImage() {
    return this.formData.get('team_left_logo')?.value;
  }
  get rightTeamImage() {
    return this.formData.get('team_right_logo')?.value;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  submitData() {
    this.spinnerService.show();
    delete this.formData.value['teamADetails'];
    delete this.formData.value['teamBDetails'];
    this.dialogRef.close({
      status: true,
      data: {
        ...this.data,
        ...this.formData.value,
        prediction_image_url:
          this.formData.value.prediction_image_url &&
          this.formData.value.prediction_image_url !== 'NA'
            ? this.formData.value.prediction_image_url
            : null,
      },
    });
  }
}
