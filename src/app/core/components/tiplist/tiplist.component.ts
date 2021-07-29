import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { MenuDropDownRendrer } from 'src/app/shared/components/menudropdown_rendrer/menu_dropdown_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { AddTipComponent } from 'src/app/shared/dialogs/add-tip/add-tip.component';
import { TipData, TipRequestData } from '../../data-models/tip/tip.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-tiplist',
  templateUrl: './tiplist.component.html',
  styleUrls: ['./tiplist.component.scss']
})
export class TiplistComponent implements OnInit {
  activeCategoryView: string | undefined;
  tipMasterData:TipData|undefined
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
    dropdownMenuRendrer: MenuDropDownRendrer,
  };


  columnDefs = [

    { headerName: 'Title (English)',field:'tip_title_en' },
    { headerName: 'Title (Hindi)',field:'tip_title_hn' },

    { headerName: 'Description',field:'news_decription_en',width:400,
    cellRenderer:'htmlRendrer',cellRendererParams:(params:any)=>({
      htmlText:(params.data as TipRequestData).tip_decription_en
    }) },
    { headerName: 'PublishDate',field:'created_on', valueGetter: this.getFormattedInsDate },
    // { headerName: 'Actions', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
    //   clicked:()=>{
    //    // console.log(params.data)
    //     this.storeService.editTip(params.data)
    //   },
    //   buttonText: 'Edit',
    // }) }
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: "dropdownMenuRendrer",
      filter: false,
      width: 120,
      cellRendererParams: (params:any) => ({
        dataMap: [
          {
            name: "Edit",
            shouldShow: true,
            callback:()=>{
              this.storeService.editTip(params.data)
            },
          },
          {
            name: "Delete",
            shouldShow: true,
            class:"bg-primary text-white",
            callback:()=>{
                this.storeService.deleteTip(params.data)
              },
          },

        ],
      }),
    },
];

getFormattedInsDate(params:any){
  const date =  (params.data as TipRequestData).created_on
  return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
}

rowData:TipRequestData[]|undefined

  constructor(private storeService:StoreService) { }
openTipDialog()
  {
    if(this.activeCategoryView){
      this.storeService.createNewTip(this.activeCategoryView)
    }
  }

  ngOnInit(): void {
    this.storeService.getAllTips$.subscribe((val) => {
      if (val) {
        this.tipMasterData = val;
        this.activeCategoryView = Object.keys(this.tipMasterData)[0];
        this.rowData = this.tipMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllTips();
  }

  get categoryKeys() {
    if (this.tipMasterData) {
      return Object.entries(this.tipMasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.tipMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.tipMasterData[this.activeCategoryView];
    }
  }

}
