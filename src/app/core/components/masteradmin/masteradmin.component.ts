import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { PasswordEyeRendrerComponent } from 'src/app/shared/components/password-eye-rendrer/password-eye-rendrer.component';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';

import { AddMasterComponent } from 'src/app/shared/dialogs/add-master/add-master.component';
import { PasswordComponent } from 'src/app/shared/dialogs/password/password.component';

import { AllMasterAppData } from '../../data-models/master-app-data';
import { StoreService } from '../../services/store-service/store.service';


@Component({
  selector: 'app-masteradmin',
  templateUrl: './masteradmin.component.html',
  styleUrls: ['./masteradmin.component.scss']
})
export class MasteradminComponent implements OnInit {

  constructor(private dialog:MatDialog,private storeService:StoreService) { }
  shouldShow:boolean = false;

  rowData:Observable<AllMasterAppData[]|undefined>|undefined;


  columnDefs = [
    { field: 'app_name',width:150, headerName:'App Name' },
    { field: 'package_name',width:250  ,headerName:'Package Name'},
    { field: 'banner_id1' ,headerName:'Banner ID'},
    { field: 'banner_id1',headerName:'Banner ID 1' },
    { field: 'native_add_id',headerName:'Native Add Id' },
    { field: 'interstitial_id',headerName:'Interstitial Id' },
    { field: 'console_id' ,headerName:'Console Id'},
    {
      field:'console_password',
      headerName:'Password',
      cellRenderer:'passwordRendrer',
      cellRendererParams:(params:any)=>({
        password:(params.data as AllMasterAppData).console_password
      })
    },
    {
      field:'contact_phone',
      headerName:'Phone',
      cellRenderer:'passwordRendrer',
      cellRendererParams:(params:any)=>({
        password:(params.data as AllMasterAppData).contact_phone
      })
    },
    { field: 'contact_email',headerName: 'Console Email' },
    { field: 'click_count' ,headerName: 'Click Count'},
    {
      field:'status',
      headerName:'status',
      cellRenderer:'statusRendrer',
      cellRendererParams:(params:any)=>({
        text:(params.data as AllMasterAppData).status,
        className:this.getStyleClassName((params.data as AllMasterAppData).status)
        //className:(params.data as AllMasterAppData).user_role===environment.adminRoleName?'badge-primary':'badge-warning'
      })

    },

    {
      field: "published_on",
      width: 170,
      headerName: "Published On",
      valueGetter: this.getFormattedDate,
      filter: "agDateColumnFilter",
    },
    {field:'actions',headerName:'Actions',cellRenderer:'buttonRendrer',cellRendererParams:(params:any)=>({
      buttonText:'Edit',
      isIconButton:false,
      clicked:()=>this.updateAppData(params.data as AllMasterAppData)
    })}
];

frameworkComponents = {
   passwordRendrer:PasswordEyeRendrerComponent,
   statusRendrer: StatusRendrer,
  buttonRendrer:BtnCellRenderer
};

defaultColDef = {
  filter: "agTextColumnFilter",
  floatingFilter: true,
  wrapText: true,
  sortable: true,
  autoHeight: true,
};

getStyleClassName(order_status:any):string{

  switch (order_status) {
    case 'Published':
      return 'badge-success'
    case 'Added':
        return 'badge-danger';
    case 'Development':
        return 'badge-warning'
    default:
      return 'badge-primary'
  }
}
getFormattedDate(params: any) {
  const date = (params.data as AllMasterAppData).published_on;
  if (date) {
    return new DatePipe('en-US').transform(date, 'MMM dd, yyyy');
  }
  return '';
}
  ngOnInit(): void {
    this.rowData = this.storeService.masterAppData$
    this.storeService.dispatchMasterAppData()
    this.rowData.subscribe(console.log)
    // this.rowData.subscribe(console.log)
    const isAlreadyAuthenticated = sessionStorage.getItem('isAuth');
    if(isAlreadyAuthenticated && isAlreadyAuthenticated==='true'){
      this.shouldShow = true;

    }else{
    this.dialog.open(PasswordComponent,{width:'40%'}).afterClosed().subscribe(val=>{
      if(val.status){
        sessionStorage.setItem('isAuth',"true");
        this.shouldShow = true;
        this.storeService.dispatchMasterAppData()
      }
    })
  }
  }
  closeDialog()
  {

  }
  openItemDialog()
  {
    this.storeService.addAppData();
  }
  updateAppData(appData:AllMasterAppData){
    this.storeService.updateAppData(appData)
  }
}
