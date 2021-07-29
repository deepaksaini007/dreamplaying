import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllFedbacks, FeedbackData } from '../../data-models/feedback/feedback.data';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-master-setting',
  templateUrl: './master-setting.component.html',
  styleUrls: ['./master-setting.component.scss']
})
export class MasterSettingComponent implements OnInit {

  rowData:Observable<FeedbackData|undefined>|undefined
  columnDefs = [
    { field: 'feedback_text',headerName:'Feedback Text' },
    {field:'user_email',headerName:'User Email ID'},
    { headerName: 'Feedback received on', valueGetter:this.getFormattedInsDate },
    

];

getFormattedInsDate(params:any){
  const date =  (params.data as AllFedbacks).created_on
  return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
}


defaultColDef = {
  filter: "agTextColumnFilter",
  floatingFilter: true,
  wrapText: true,
  sortable: true,
  autoHeight: true,
};

frameworkComponents = {
  
};


  gridApi: any;
  gridColumnApi: any;
  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.storeService.loadAllFeedbacks()
    this.rowData = this.storeService.getFeedackData$
  }

  onGridReady(params:any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi?.sizeColumnsToFit()

  }

}
