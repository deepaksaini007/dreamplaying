import { Component, OnInit } from '@angular/core';
import { DashboardData } from '../../data-models/dashboard_data/dashboard_data.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private storeService:StoreService) { }

  dashboardData:DashboardData|undefined
  title = 'dreamTeamNijomee';

  ngOnInit(): void {
    this.storeService.getDashbaordData$.subscribe(val=>{
      this.dashboardData = {...val}
    })
  }

}
