import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { MenuDropDownRendrer } from 'src/app/shared/components/menudropdown_rendrer/menu_dropdown_rendrer';
import { PasswordEyeRendrerComponent } from 'src/app/shared/components/password-eye-rendrer/password-eye-rendrer.component';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';
import { environment } from 'src/environments/environment';
import { UserData } from '../../data-models/auth-response/auth_response.data';
import { StoreService } from '../../services/store-service/store.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.loadAllRegisteredUsers();
    this.rowData = this.storeService.getAllRegisteredUsers$;
  }
  rowData: Observable<UserData[] | undefined> | undefined;

  defaultColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    wrapText: true,
    sortable: true,
    autoHeight: true,
  };
  columnDefs = [
    {
      field: 'display_name',
      headerName:'Display Name'
    },
    {
      field:'user_phone_elm',
      headerName:"Phone Number",
    },
    {
      field:'user_login_elm',
      headerName:"User Name"
    },
    {
      field:'user_email_elm',
      headerName:"User email"
    },
    {
      field:'user_pass_elm',
      headerName:'Password',
      cellRenderer:'passwordRendrer',
      cellRendererParams:(params:any)=>({
        password:(params.data as UserData).user_pass_elm
      })
    },
    {
      field:'user_auth_code',
      headerName:'Auth Code',
      cellRenderer:'passwordRendrer',
      cellRendererParams:(params:any)=>({
        password:(params.data as UserData).user_auth_code
      })
    },
    {
      field:'user_role',
      headerName:'User Role',
      cellRenderer:'statusRendrer',
      cellRendererParams:(params:any)=>({
        text:(params.data as UserData).user_role,
        className:(params.data as UserData).user_role===environment.adminRoleName?'badge-primary':'badge-warning'
      })

    },
    {
      field:'status',
      cellRenderer:'switchCellRendrer',
      filter:false,

      cellRendererParams:(params:any)=>({
        isSwitchOn:(params.data as UserData).is_active,
        clicked:(data:boolean)=>{
          this.updateUserStatus({...params.data as UserData,is_active:data})
        }

      })

    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: "dropdownMenuRendrer",
      filter: false,

      cellRendererParams: (params:any) => ({
        dataMap: [
          {
            name: "Edit",
            shouldShow: true,
            callback:()=>{
              this.storeService.updateUserProfile(params.data)
            },
          },
          {
            name: "Delete",
            class:"bg-primary text-white",
            shouldShow: true,
              callback:()=>{
                this.storeService.deleteUserProfile(params.data)
              },
          },

        ],
      }),
    },
    // {
    //   field:'actions',
    //   headerName:'Actions',
    //   filter:false,
    //   cellRenderer:'btnRendrer',
    //   cellRendererParams:(params:any)=>({
    //     buttonText:'Edit',
    //     clicked:()=>{
    //       this.updateUserProfile({...params.data as UserData})
    //     }
    //   })

    // },


  ];

  frameworkComponents = {
    statusRendrer: StatusRendrer,
    btnRendrer:BtnCellRenderer,
    switchCellRendrer:SwitchCellRendrer,
    passwordRendrer:PasswordEyeRendrerComponent,
    dropdownMenuRendrer:MenuDropDownRendrer
  };
  gridApi: any;
  gridColumnApi: any;
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi?.sizeColumnsToFit();
  }

  updateUserStatus(userData:UserData){
    this.storeService.updateUserProfile(userData,true)
  }

  updateUserProfile(userData:UserData){
    this.storeService.updateUserProfile(userData)
  }

  registerNewUser(){
    this.storeService.registerNewUser()
  }
}
