import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "html-rendrer",
  templateUrl:'./html-rendrer.html'
})
export class HtmlRendrer implements AgRendererComponent  {
  public htmlText: string|undefined;
  
  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;
   
  }
  
  private params: any;

  agInit(params: ICellRendererParams): void {
    
    this.params = params;
    this.htmlText = this.params.htmlText;
  }

  


  
}
