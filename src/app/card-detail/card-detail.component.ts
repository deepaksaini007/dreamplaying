import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardDetailComponent>)  { }

  ngOnInit(): void {
    this.dialogRef.addPanelClass('card-details')
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
