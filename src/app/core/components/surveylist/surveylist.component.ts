import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { ImageRendrer } from 'src/app/shared/components/image-rendrer/image_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { TeamLogoRendrer } from 'src/app/shared/components/team-logo-rendrer/team_logo_rendrer';
import { ViewSurveyComponent } from 'src/app/shared/dialogs/view-survey/view-survey.component';


import { SurveyData, SurveyRequestData } from '../../data-models/surveys/survey.model';
import { StoreService } from '../../services/store-service/store.service';


@Component({
  selector: 'app-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.scss']
})
export class SurveylistComponent implements OnInit {

  activeCategoryView: string | undefined;
  surveyMasterData: SurveyData | undefined;
  defaultColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    wrapText: true,
    sortable: true,
    autoHeight: true,
  };


  frameworkComponents = {
    statusRendrer: StatusRendrer,
    btnRendrer: BtnCellRenderer,
    htmlRendrer: HtmlRendrer,
    imgRendrer: ImageRendrer,
    teamLogoRendrer: TeamLogoRendrer,
  };

  columnDefs = [
    { headerName: 'Match title', field: 'match_title_en' },
    { headerName: 'Match Name', field: 'match_name_en' },
    {
      headerName: 'Team Left',
      field: 'team_left',
      cellRenderer: 'teamLogoRendrer',
      cellRendererParams: (params: any) => ({
        teamName: (params.data as SurveyRequestData).team_left_name,
        logoUrl: (params.data as SurveyRequestData).team_left_logo,
      }),
    },
    {
      headerName: 'Team Right',
      field: 'team_left',
      cellRenderer: 'teamLogoRendrer',
      cellRendererParams: (params: any) => ({
        teamName: (params.data as SurveyRequestData).team_right_name,
        logoUrl: (params.data as SurveyRequestData).team_right_logo,
      }),
    },
    {
      headerName: 'Preview Text',
      width: 400,
      field: 'team_left',
      cellRenderer: 'htmlRendrer',
      cellRendererParams: (params: any) => ({
        htmlText: (params.data as SurveyRequestData).match_title_en,
      }),
    },
    {
      headerName: 'Location',
      width: 400,
      field: 'team_left',
      cellRenderer: 'imgRendrer',
      cellRendererParams: (params: any) => ({
        imageUrl: (params.data as SurveyRequestData).match_location,
      }),
    },
  ];

  getFormattedInsDate(params: any) {
    const date = (params.data as SurveyRequestData).created_on;
    return new DatePipe('en-US').transform(date, 'MMM dd, yyyy');
  }

  rowData: SurveyRequestData[] | undefined;

  constructor(private storeService: StoreService, public dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.storeService.getSurveys$.subscribe((val) => {
      if (val) {
        this.surveyMasterData = val;
        this.activeCategoryView = Object.keys(this.surveyMasterData)[0];
        this.rowData = this.surveyMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllSurveys();
  }

  get categoryKeys() {
    if (this.surveyMasterData) {
      return Object.entries(this.surveyMasterData).map(
        ([key, value]) => key
      );
    }
    return [];
  }
  viewSurvey()
  {
    this.dialogRef.open(ViewSurveyComponent)
  }
  changeCategoryView(itemName: string) {
    if (this.surveyMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.surveyMasterData[this.activeCategoryView];
    }
  }
}
