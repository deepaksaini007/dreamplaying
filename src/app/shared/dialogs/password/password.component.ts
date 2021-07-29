import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  constructor(public dialog:MatDialogRef<PasswordComponent>) { }

  passwordEntered:string = '';

  ngOnInit(): void {
  }

  closeDialog(){

  }
  get isPasswordCorrect():boolean{
    return this.passwordEntered===environment.password;
  }

  authenticateUser(){
    if(this.passwordEntered && this.passwordEntered===environment.password){
    this.dialog.close({
      status:true,

    })
  }

  }

}
