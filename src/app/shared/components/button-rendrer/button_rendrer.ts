import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "btn-cell-renderer",
  templateUrl:'./button_rendrer.html'
})
export class BtnCellRenderer implements AgRendererComponent  {
  public buttonText: string|undefined;
  public isIconButton:boolean|undefined;
  className:string = 'btn-primary';
  public icon:string|undefined;
  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;
   
  }
  
  private params: any;

  agInit(params: ICellRendererParams): void {
    
    this.params = params;
    this.buttonText = this.params.buttonText;
    this.isIconButton  = this.params.isIconButton;
    this.icon = this.params.icon;
    this.className = this.params.className;
  }

  btnClickedHandler(event:any) {
    this.params.clicked();
  }


  
}
