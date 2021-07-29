import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/core/data-models/auth-response/auth_response.data';
import { DashboardMenu } from 'src/app/core/data-models/dashboard-menu/indes';
import { StoreService } from 'src/app/core/services/store-service/store.service';

@Component({
  selector: 'app-register-user-dialog',
  templateUrl: './register-user-dialog.component.html',
  styleUrls: ['./register-user-dialog.component.scss'],
})
export class RegisterUserDialogComponent implements OnInit {
  constructor(private dialog:MatDialogRef<RegisterUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public dialogData:{userData:UserData},private spinnerService: NgxSpinnerService,private storeService:StoreService) {}
  userFormGroup!: FormGroup;

  allAvailableMenus$:Observable<DashboardMenu[]>|undefined
  isPasswordVisible:boolean = false


  closeDialog(){
    this.dialog.close();
  }

  ngOnInit(): void {
    this.spinnerService.hide();
    this.allAvailableMenus$ = this.storeService.assignedMenus$;
    this.userFormGroup = new FormGroup({
      user_email_elm: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      user_login_elm: new FormControl(null,[Validators.required,Validators.minLength(5)]),
      
      user_phone_elm: new FormControl(null, [Validators.required]),
      user_pass_elm: new FormControl(this.generateRandomAuthCode(8), [Validators.required,Validators.minLength(6)]),
      user_auth_code: new FormControl(this.generateRandomAuthCode(6), [
        Validators.required,
        Validators.minLength(6)
      ]),
      user_gender:new FormControl(null,[Validators.required]),
      user_role: new FormControl(null, [Validators.required,]),
      display_name:new FormControl(null,[Validators.required]),
      assigned_menu_details:new FormControl(null,[Validators.required]),
      assigned_menu:new FormControl(null,[Validators.required])
    });
    if(this.dialogData){
      this.allAvailableMenus$.subscribe(data=>{
        const accessedMenuId = this.dialogData.userData.assigned_menu?.split(",").map(a=>+a);
        if(accessedMenuId){
          const menus = data.filter(menu=>menu && menu.menu_id &&  accessedMenuId.includes(menu.menu_id))
          this.userFormGroup.patchValue({...this.dialogData.userData,assigned_menu_details:[...menus]})
        }
      })
    }
    this.onMenusChanged();
  }

  onMenusChanged(){
    this.userFormGroup.get('assigned_menu_details')?.valueChanges.subscribe(data=>{
      const assignedMenus = data as DashboardMenu[];
      if(assignedMenus){
        this.userFormGroup.patchValue({assigned_menu:assignedMenus.map(a=>a.menu_id?.toString()).join(",")})
      }
    })
  }

  generateRandomAuthCode(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  submitData() {
    delete this.userFormGroup.value['assigned_menu_details']
    this.spinnerService.show();
    const userDetails = this.userFormGroup.value as UserData;
    this.dialog.close({
      status:true,
      data:{
        ...this.dialogData?.userData,
        ...this.userFormGroup.value,
        user_first_name_elm:userDetails.display_name?.split(" ")[0],
        user_last_name:userDetails.display_name?.split(" ")[1],
        is_active:true
      }
    })
  }

  objectComparisonFunction = function (option:DashboardMenu, value:DashboardMenu): boolean {
    if (option && value) {
      return option.guid === value.guid;
    }
    return false;
  };
}
