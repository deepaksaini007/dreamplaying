import { Component, OnDestroy } from "@angular/core";
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "image-rendrer",
  templateUrl:'./image_rendrer.html'
})
export class ImageRendrer implements AgRendererComponent  {
  public imageUrl: string|undefined;

  refresh(params: ICellRendererParams):boolean {
   this.params = params;
    return false;

  }

  private params: any;

  agInit(params: ICellRendererParams): void {

    this.params = params;
    this.imageUrl = this.params.imageUrl;
  }



}
