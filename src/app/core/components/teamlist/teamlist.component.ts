import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from 'src/app/shared/components/html-rendrer/html-rendrer';
import { ImageRendrer } from 'src/app/shared/components/image-rendrer/image_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { AddTeamComponent } from 'src/app/shared/dialogs/add-team/add-team.component';
import { TeamData, TeamRequestData } from '../../data-models/teams/team.model';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss']
})
export class TeamlistComponent implements OnInit {
  activeCategoryView: string | undefined;
  teamMasterData:TeamData|undefined
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
    imgRendrer:ImageRendrer
  };


  columnDefs = [
    { headerName: 'Team name',field:'team_name' },
    { headerName: 'Team Logo',field:'team_logo', cellRenderer:'imgRendrer',cellRendererParams:(params:any)=>({
      imageUrl:(params.data as TeamRequestData).team_logo
    })},
    {
      field: 'is_active',
      headerName: 'Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className:(params.data as TeamRequestData).is_active
        ? 'badge-success'
        : 'badge-primary',
        text: (params.data as TeamRequestData).is_active
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    
];

getFormattedInsDate(params:any){
  const date =  (params.data as TeamRequestData).created_on
  return new DatePipe('en-US').transform(date,'MMM dd, yyyy')
}

rowData:TeamRequestData[]|undefined

constructor(private storeService:StoreService) { }

  
  openTeamDialog()
  {
    this.storeService.createNewTeam()
  }
  ngOnInit(): void {
    this.storeService.getAllTeams$.subscribe((val) => {
      if (val) {
        this.teamMasterData = val;
        if(!this.activeCategoryView){
        this.activeCategoryView = Object.keys(this.teamMasterData)[0];
        }
        this.rowData = this.teamMasterData[this.activeCategoryView];
      }
    });
    this.storeService.loadAllTeams();
  }

  get categoryKeys() {
    if (this.teamMasterData) {
      return Object.entries(this.teamMasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.teamMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.teamMasterData[this.activeCategoryView];
    }
  }
}
