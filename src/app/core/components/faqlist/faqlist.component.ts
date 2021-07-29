import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { MenuDropDownRendrer } from 'src/app/shared/components/menudropdown_rendrer/menu_dropdown_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { AddFaqComponent } from 'src/app/shared/dialogs/add-faq/add-faq.component';
import { FaQData, FAQRequestData } from '../../data-models/faq/faq.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-faqlist',
  templateUrl: './faqlist.component.html',
  styleUrls: ['./faqlist.component.scss']
})
export class FAQlistComponent implements OnInit {
  activeCategoryView: string | undefined;
  faqmasterData:FaQData|undefined
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
    { headerName: 'Title',field:'faq_title_en' },
    { headerName: 'Title (Hindi)',field:'faq_title_hn' },

    { headerName: 'Description',field:'news_decription_en',width:400,
    cellRenderer:'htmlRendrer',cellRendererParams:(params:any)=>({
      htmlText:(params.data as FAQRequestData).faq_decription_en
    }) },
    { headerName: 'PublishDate',field:'created_on', valueGetter: this.getFormattedInsDate },
    // { headerName: 'Actions', cellRenderer:'btnRendrer',cellRendererParams:(params:any)=>({
    //   clicked:()=>{
    //     this.storeService.editFaq(params.data)
    //   },
    //   buttonText: 'Edit',
    // }) },
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
              this.storeService.editFaq(params.data)
            },
          },
          {
            name: "Delete",
            shouldShow: true,
            class:"bg-primary text-white",
            callback:()=>{
                this.storeService.deleteFaq(params.data)
              },
          },

        ],
      }),
    },
];

getFormattedInsDate(params:any){
  const date =  (params.data as FAQRequestData).created_on
  return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
}

rowData:FAQRequestData[]|undefined

  constructor(private storeService:StoreService,public dialog:MatDialog) { }
  openFAQDialog()
  {
    if(this.activeCategoryView){
      this.storeService.createNewFaq(this.activeCategoryView)
    }
  }
  ngOnInit(): void {
    this.storeService.getAllFaqs$.subscribe((val) => {
      if (val) {
        this.faqmasterData = val;
        this.activeCategoryView = Object.keys(this.faqmasterData)[0];
        this.rowData = this.faqmasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllFaqs();
  }

  get categoryKeys() {
    if (this.faqmasterData) {
      return Object.entries(this.faqmasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.faqmasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.faqmasterData[this.activeCategoryView];
    }
  }

}
