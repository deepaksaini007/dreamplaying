import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { ImageRendrer } from 'src/app/shared/components/image-rendrer/image_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { TeamLogoRendrer } from 'src/app/shared/components/team-logo-rendrer/team_logo_rendrer';
import { AddMatchComponent } from 'src/app/shared/dialogs/add-match/add-match.component';
import { AddPredictionComponent } from 'src/app/shared/dialogs/add-prediction/add-prediction.component';
import {
  PredictionData,
  PredictionRequestData,
} from '../../data-models/prediction/prediction.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-predictionlist',
  templateUrl: './predictionlist.component.html',
  styleUrls: ['./predictionlist.component.scss'],
})
export class PredictionlistComponent implements OnInit {
  activeCategoryView: string | undefined;
  predictionMasterData: PredictionData | undefined;
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
        teamName: (params.data as PredictionRequestData).team_left_name,
        logoUrl: (params.data as PredictionRequestData).team_left_logo,
      }),
    },
    {
      headerName: 'Team Right',
      field: 'team_left',
      cellRenderer: 'teamLogoRendrer',
      cellRendererParams: (params: any) => ({
        teamName: (params.data as PredictionRequestData).team_right_name,
        logoUrl: (params.data as PredictionRequestData).team_right_logo,
      }),
    },
    {
      headerName: 'Preview Text',
      width: 400,
      field: 'team_left',
      cellRenderer: 'htmlRendrer',
      cellRendererParams: (params: any) => ({
        htmlText: (params.data as PredictionRequestData).preview_text_en,
      }),
    },
    {
      headerName: 'Prediction Image',
      width: 400,
      field: 'team_left',
      cellRenderer: 'imgRendrer',
      cellRendererParams: (params: any) => ({
        imageUrl: (params.data as PredictionRequestData).prediction_image_url,
      }),
    },

    {
      field: 'has_prediction',
      headerName: 'Prediction Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className: (params.data as PredictionRequestData).has_prediction
          ? 'badge-success'
          : 'badge-primary',
        text: (params.data as PredictionRequestData).has_prediction
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    {
      field: 'Actions',
      headerName: 'Predict',
      cellRenderer: 'btnRendrer',
      cellRendererParams: (params: any) => ({
        buttonText: 'Predict',
        clicked: () => {
            this.storeService.addPredictionToMatch(params.data);

        },
      }),
    },
    {
      field: 'Actions',
      headerName: 'Edit Match',
      cellRenderer: 'btnRendrer',
      cellRendererParams: (params: any) => ({
        buttonText: 'Edit Match',
        clicked: () => {
            this.storeService.updateMatchPrediction(params.data);

        },
      }),
    },

  ];

  getFormattedInsDate(params: any) {
    const date = (params.data as PredictionRequestData).created_on;
    return new DatePipe('en-US').transform(date, 'MMM dd, yyyy');
  }

  rowData: PredictionRequestData[] | undefined;

  constructor(private storeService: StoreService) {}
  editMatch(data:PredictionRequestData){
    this.storeService.updateMatchPrediction(data);
  }
  addPredictionToMatch(data:PredictionRequestData){
    this.storeService.addPredictionToMatch(data);
  }

  addMatch() {
    this.storeService.createNewMatchPrediction();
  }
  deletePredictions(data:PredictionRequestData)
  {
    this.storeService.deletePredictions(data);
  }
  ngOnInit(): void {
    this.storeService.getAllMatchPredictions$.subscribe((val) => {
      if (val) {
        this.predictionMasterData = val;
        this.activeCategoryView = Object.keys(this.predictionMasterData)[0];
        this.rowData = this.predictionMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllMatchPredictions();
  }

  get categoryKeys() {
    if (this.predictionMasterData) {
      return Object.entries(this.predictionMasterData).map(
        ([key, value]) => key
      );
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.predictionMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.predictionMasterData[this.activeCategoryView];
    }
  }
}
