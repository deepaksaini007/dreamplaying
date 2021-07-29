import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "team_logo",
  templateUrl:'./team_logo_rendrer.html'
})
export class TeamLogoRendrer implements AgRendererComponent  {
  public teamName: string|undefined;
  public logoUrl:string|undefined;
  public height:number = 20;
  public width:number  = 20;
  
  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;
   
  }
  
  private params: any;

  agInit(params: ICellRendererParams): void {
    
    this.params = params;
    this.teamName = this.params.teamName;
    this.logoUrl = this.params.logoUrl ;
    this.height = this.params.height??20;
    this.width = this.params.width??20;
  }

  btnClickedHandler(event:any) {
    this.params.clicked();
  }


  
}
