import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from './core/services/store-service/store.service';
import { CREATE_NEWS_ACTION_EVENT, CREATE_STORY_ACTION_EVENT, CREATE_VIDEO_ACTION_EVENT } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private storeService:StoreService,private spinnerService:NgxSpinnerService){
    this.storeService.loadDashboardData()
    this.storeService.isLoading$.subscribe(val=>{
      if(val) this.spinnerService.show()
      else this.spinnerService.hide()
    })
  }
}
