import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { CardDetailComponent } from 'src/app/card-detail/card-detail.component';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';
import { AddNewsComponent } from 'src/app/shared/dialogs/add-news/add-news.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { NewsData, NewsRequestData } from '../../data-models/news/news.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit {

  activeCategoryView: string | undefined;
  gridApi:GridApi|undefined
  gridColumnApi:ColumnApi|undefined;
  newsMasterData:NewsData|undefined
  defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    wrapText: true,
    sortable: true,
    autoHeight: true,
  };

  frameworkComponents = {
    statusRendrer: StatusRendrer,
    btnRendrer:BtnCellRenderer,
    htmlRendrer:HtmlRendrer,
    switchRendrer:SwitchCellRendrer

  };
  publishNews(data:NewsRequestData){

    this.storeService.publishNews(data)
  }

  editNews(data:NewsRequestData){
    this.storeService.editNews(data)
  }

  activateDeactivateNews(data:NewsRequestData){
    this.storeService.editNews({...data,is_active:!data.is_active},true)
  }

  featuredNotFeatured(data:NewsRequestData){
    this.storeService.editNews({...data,is_featured:!data.is_featured},true)
  }

  columnDefs = [
    { headerName: 'Title',field:'news_title_en' },
    { headerName: 'Title (Hindi)',field:'news_title_hn' },
    { headerName: 'Description',field:'news_decription_en',width:400,
    cellRenderer:'htmlRendrer',cellRendererParams:(params:any)=>({
      htmlText:(params.data as NewsRequestData).news_decription_en
    }) },
    { headerName: 'Author',field:'news_credits_by_en' },
    { headerName: 'PublishDate', valueGetter:this.getFormattedInsDate },

    { headerName: 'Publish', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        if(!(params.data as NewsRequestData).is_published){
          this.storeService.publishNews(params.data)

          }
      },
      buttonText: (params.data as NewsRequestData).is_published?'Published':'Publish',
      className:(params.data as NewsRequestData).is_published?'btn-success':'btn-primary'
    }) },
    { headerName: 'Delete', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        if(!(params.data as NewsRequestData).is_active){
          this.storeService.deleteNews(params.data)

          }
      },
      buttonText: (params.data as NewsRequestData).is_active?'Delete':'Delete',
      className:(params.data as NewsRequestData).is_active?'btn-success':'btn-dager'
    }) },
    { headerName: 'Actions', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
      clicked:()=>{
        this.storeService.editNews(params.data)
      },
      buttonText: 'Edit',
    }) },
    {
      field: 'is_active',
      headerName: 'Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className:(params.data as NewsRequestData).is_active
        ? 'badge-success'
        : 'badge-primary',
        text: (params.data as NewsRequestData).is_active
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    { field: 'Active Status',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as NewsRequestData).is_active,
      clicked:(value:boolean)=>{
        this.storeService.editNews({...params.data,is_active:value},true)
      }
    })
   },
   { field: 'Featured',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as NewsRequestData).is_featured,
      clicked:(value:boolean)=>{
        this.storeService.editNews({...params.data,is_featured:value},true)
      }
    })
   },
];

rowData:NewsRequestData[]|undefined

  constructor(public dialog :MatDialog,private storeService:StoreService) { }

  viewDetails(){
    // this.dialog.open(CardDetailComponent);
  }
  ngOnInit(): void {
    this.storeService.getAllNews$.subscribe((val) => {
      if (val) {
        this.newsMasterData = val;
        if(!this.activeCategoryView){
          this.activeCategoryView = Object.keys(this.newsMasterData)[0];
        }
        this.rowData = this.newsMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllNews();
  }
  addNews()
  {
    this.dialog.open(AddNewsComponent)
  }

  openNewsDialog(){
    this.storeService.createNewNews(this.activeCategoryView!)
  }

  getFormattedInsDate(params:any){
    const date =  (params.data as NewsRequestData).published_on
    return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
  }

  get categoryKeys() {
    if (this.newsMasterData) {
      return Object.entries(this.newsMasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.newsMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.newsMasterData[this.activeCategoryView];
    }
  }
  onGridReady(params:any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi?.sizeColumnsToFit()

  }
  deleteNews(data:NewsRequestData)
  {
       this.storeService.deleteNews(data)
  }
  truncateNews()
  {
    this.storeService.truncateAllNews(this.rowData ?this.rowData[0]:undefined)

  }
}
