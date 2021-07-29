import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-password-eye-rendrer',
  templateUrl: './password-eye-rendrer.component.html',
  styleUrls: ['./password-eye-rendrer.component.scss']
})
export class PasswordEyeRendrerComponent implements AgRendererComponent {
  public password: string|undefined;
  isPasswordVisible:boolean = false;

  constructor() { }

  refresh(params: ICellRendererParams):boolean {
    this.params = params;
     return false;
    
   }
   private params: any;

  agInit(params: ICellRendererParams): void {
    
    this.params = params;
    this.password = this.params.password;
  }

  get maskedPassword(){
    return this.password?.split("").map(d=>'*').join("")
  }

}
