import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';
import { TeamLogoRendrer } from 'src/app/shared/components/team-logo-rendrer/team_logo_rendrer';
import { AddVideoComponent } from 'src/app/shared/dialogs/add-video/add-video.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {
  VideoData,
  VideoRequestData,
} from '../../data-models/videos/videos.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss'],
})
export class VideolistComponent implements OnInit {
  activeCategoryView: string | undefined;
  videoMasterData: VideoData | undefined;
  gridApi:GridApi|undefined
  gridColumnApi:ColumnApi|undefined;
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
    teamLogoRendrer: TeamLogoRendrer,
    switchRendrer:SwitchCellRendrer
  };

  publishVideo(videData:VideoRequestData){
    this.storeService.publishVideo(videData);
  }
  editVideo(videoData:VideoRequestData){
    this.storeService.editVideo(videoData);
  }
  activateDeactivateVideo(videoData:VideoRequestData){
    this.storeService.editVideo({...videoData,is_active:!videoData.is_active},true)
  }
  featuredNotFeatured(videoData:VideoRequestData){
    this.storeService.editVideo({...videoData,is_featured:!videoData.is_featured},true)
  }

  columnDefs = [
    { headerName: 'Title', field: 'video_title_en' },
    { headerName: 'Title (Hindi)', field: 'video_title_hn' },
    { headerName: 'Video Description', field: 'video_decription_en',width:300 },
    {
      headerName: 'Video URL',
      field: 'video_url',
      cellRenderer: 'teamLogoRendrer',
      cellRendererParams: (params: any) => ({
        teamName: (params.data as VideoRequestData).video_url,
        height: 90,
        width: 200,
        logoUrl:
          (params.data as VideoRequestData).image_thumbnail ??
          `https://img.youtube.com/vi/${this.youtube_parser(
            (params.data as VideoRequestData).video_url!
          )}/0.jpg`,
      }),
    },

    {
      headerName: 'PublishDate',
      field: 'created_on',
      valueGetter: this.getFormattedInsDate,
    },
    {
      headerName: 'Publish',
      cellRenderer: 'btnRendrer',
      cellRendererParams: (params: any) => ({
        clicked: () => {
          if (!(params.data as VideoRequestData).is_published) {
            this.storeService.publishVideo(params.data);
          }
        },
        buttonText: (params.data as VideoRequestData).is_published
          ? 'Published'
          : 'Publish',
        className: (params.data as VideoRequestData).is_published
          ? 'btn-success'
          : 'btn-primary',
      }),
    },
    {
      headerName: 'Delete',
      cellRenderer: 'btnRendrer',
      cellRendererParams: (params: any) => ({
        clicked: () => {
          if (!(params.data as VideoRequestData).is_active) {
            this.storeService.deleteVideo(params.data);
          }
        },
        buttonText: (params.data as VideoRequestData).is_active
          ? 'Delete'
          : 'Delete',
        className: (params.data as VideoRequestData).is_active
          ? 'btn-success'
          : 'btn-danger',
      }),
    },
    {
      headerName: 'Actions',
      cellRenderer: 'btnRendrer',
      cellRendererParams: (params: any) => ({
        clicked: () => {
          this.storeService.editVideo(params.data);
        },
        buttonText: 'Edit',
      }),
    },
    {
      field: 'is_active',
      headerName: 'Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className:(params.data as VideoRequestData).is_active
        ? 'badge-success'
        : 'badge-primary',
        text: (params.data as VideoRequestData).is_active
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    { field: 'Active Status',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as VideoRequestData).is_active,
      clicked:(value:boolean)=>{
        this.storeService.editVideo({...params.data,is_active:value},true)
      }
    })
   },
   { field: 'Featured',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as VideoRequestData).is_featured,
      clicked:(value:boolean)=>{
        this.storeService.editVideo({...params.data,is_featured:value},true)
      }
    })
   },
  ];

  getFormattedInsDate(params: any) {
    const date = (params.data as VideoRequestData).created_on;
    return new DatePipe('en-US').transform(date, 'MMM dd, yyyy');
  }

  rowData: VideoRequestData[] | undefined;

  constructor(private dialog: MatDialog,private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllVideo$.subscribe((val) => {
      if (val) {
        this.videoMasterData = val;
        if (!this.activeCategoryView) {
          this.activeCategoryView = Object.keys(this.videoMasterData)[0];
        }
        this.rowData = this.videoMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllVideos();
  }

  youtube_parser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  get categoryKeys() {
    if (this.videoMasterData) {
      return Object.entries(this.videoMasterData).map(([key, value]) => key);
    }
    return [];
  }

  openAddVideo() {
    if (this.activeCategoryView) {
      this.storeService.createNewVideo(this.activeCategoryView);
    }
  }

  changeCategoryView(itemName: string) {
    if (this.videoMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.videoMasterData[this.activeCategoryView];
    }
  }
  deleteVideo(videData:VideoRequestData)
  {
     this.storeService.deleteVideo(videData);

  }
  truncateVideo(){
    this.storeService.truncateVideos(this.rowData ? this.rowData[0]:undefined)
  }
  confirmPopup()
  {
    this.dialog.open(ConfirmationDialogComponent)
  }
  getYoutubeUrl():string{
    return '';
  }

  onGridReady(params:any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi?.sizeColumnsToFit()

  }
}
