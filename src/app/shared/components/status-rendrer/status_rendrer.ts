import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "status_renderer",
  templateUrl:'./status_rendrer.html'
})
export class StatusRendrer implements AgRendererComponent  {
  public text: string|undefined;
  public className:string|undefined;
  
  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;
   
  }
  
  private params: any;

  agInit(params: ICellRendererParams): void {
    
    this.params = params;
    this.text = this.params.text;
    this.className = this.params.className ?? 'badge-primary';
  }

  btnClickedHandler(event:any) {
    this.params.clicked();
  }


  
}
