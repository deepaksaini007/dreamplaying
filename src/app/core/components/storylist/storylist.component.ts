import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';
import { TeamLogoRendrer } from 'src/app/shared/components/team-logo-rendrer/team_logo_rendrer';
import { AddStoryComponent } from 'src/app/shared/dialogs/add-story/add-story.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {
  StoryData,
  StoryRequestData,
} from '../../data-models/stories/stories.mode';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-storylist',
  templateUrl: './storylist.component.html',
  styleUrls: ['./storylist.component.scss'],
})
export class StorylistComponent implements OnInit {
  activeCategoryView: string | undefined;
  storyMasterData: StoryData | undefined;
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
    teamLogoRendrer:TeamLogoRendrer,
    switchRendrer:SwitchCellRendrer

  };

  publishStory(row:StoryRequestData){
    this.storeService.publishStory(row)
  }

  editStory(row:StoryRequestData){
    this.storeService.updateStory(row)
  }
  activateDeactivateStory(row:StoryRequestData){
    this.storeService.updateStory({...row,is_active:!row.is_active},true)
  }
  featuredNotFeatured(row:StoryRequestData){
    this.storeService.updateStory({...row,is_featured:!row.is_featured},true)
  }

  columnDefs = [
    { headerName: 'Title', field: 'story_title_en' },
    { headerName: 'Title (Hindi)', field: 'story_title_hn' },
    {
      headerName: 'Description',
      width: 400,
      cellRenderer: 'htmlRendrer',
      cellRendererParams: (params: any) => ({
        htmlText: (params.data as StoryRequestData).story_decription_en,
      }),
    },
    { headerName: 'Author', field: 'story_credits_by_en' },
    { headerName: 'PublishDate', valueGetter:this.getFormattedInsDate },
    { headerName: 'Publish', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        if(!(params.data as StoryRequestData).is_published){
        this.storeService.publishStory(params.data)
        }
      },
      buttonText: (params.data as StoryRequestData).is_published?'Published':'Publish',
      className:(params.data as StoryRequestData).is_published?'btn-success':'btn-primary'
    }) },
    { headerName: 'Delete', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        if(!(params.data as StoryRequestData).is_published){
        this.storeService.deleteStory(params.data)
        }
      },
      buttonText: (params.data as StoryRequestData).is_active?'Delete':'Delete',
      className:(params.data as StoryRequestData).is_active?'btn-success':'btn-danger'
    }) },
    { headerName: 'Actions', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        this.storeService.updateStory(params.data)
      },
      buttonText: 'Edit',
    }) },
    {
      field: 'is_active',
      headerName: 'Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className:(params.data as StoryRequestData).is_active
        ? 'badge-success'
        : 'badge-primary',
        text: (params.data as StoryRequestData).is_active
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    { field: 'Active Status',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as StoryRequestData).is_active,
      clicked:(value:boolean)=>{
        this.storeService.updateStory({...params.data,is_active:value},true)
      }
    })
   },
   { field: 'Featured',
   cellRenderer:'switchRendrer',
   cellRendererParams: (params:any)=>({
     isSwitchOn:(params.data as StoryRequestData).is_featured,
     clicked:(value:boolean)=>{
       this.storeService.updateStory({...params.data,is_featured:value},true)
     }
   })
  },

  ];

  rowData: StoryRequestData[] | undefined;
  constructor(private dialog: MatDialog, private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllStories$.subscribe((val) => {
      if (val) {
        this.storyMasterData = val;
        if(!this.activeCategoryView){
          this.activeCategoryView = Object.keys(this.storyMasterData)[0];

        }
        this.rowData = this.storyMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllStories();
  }
  openStoryDialog() {
    if(this.activeCategoryView){
      this.storeService.createNewStory(this.activeCategoryView);
    }
  }

  get categoryKeys() {
    if (this.storyMasterData) {
      return Object.entries(this.storyMasterData).map(([key, value]) => key);
    }
    return [];
  }

  getFormattedInsDate(params:any){
    const date =  (params.data as StoryRequestData).published_on
    return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
  }
  deleteStory(data:StoryRequestData)
  {
     this.storeService.deleteStory(data);

  }

  truncateStories(){
    this.storeService.truncateStory(this.rowData ? this.rowData[0]:undefined)
  }
  confirmPopup()
  {
    this.dialog.open(ConfirmationDialogComponent)
  }
  changeCategoryView(itemName: string) {
    if (this.storyMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.storyMasterData[this.activeCategoryView];
    }
  }
}
