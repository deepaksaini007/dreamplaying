import { Component, Input, OnInit } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { INoRowsOverlayParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-no-rows',
  templateUrl: './no-data.component.html',
})
export class NoRowsGridComponent {

   @Input() noRowsMessage:string|undefined;

}