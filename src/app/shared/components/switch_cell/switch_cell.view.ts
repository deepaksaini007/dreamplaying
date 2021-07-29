import { Component, OnDestroy } from "@angular/core";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AgRendererComponent, ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "switch-cell-rendrer",
  templateUrl: "./switch_cell.view.html",
})
export class SwitchCellRendrer implements AgRendererComponent {
  public isSwitchOn:boolean|undefined;
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.isSwitchOn = this.params.isSwitchOn
    return true;
  }

  private params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.isSwitchOn = this.params.isSwitchOn
  }

  btnClickedHandler(event: MatSlideToggleChange) {
    this.params.clicked(event.checked);
  }
}
