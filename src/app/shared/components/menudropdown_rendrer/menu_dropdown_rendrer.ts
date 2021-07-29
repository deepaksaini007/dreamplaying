import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "menu_dropdown_rendrer",
  templateUrl:'./menu_dropdown_rendrer.html'
})
export class MenuDropDownRendrer implements AgRendererComponent  {
public dataMap !: [{name:string,class:string,callback():void}];

  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;

  }

  private params: any;

  agInit(params: ICellRendererParams): void {

    this.params = params;
    this.dataMap = this.params.dataMap.filter((val:any)=>val.shouldShow);;
  }

  btnClickedHandler(event:any) {
    this.params.clicked();
  }



}
