import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BtnCellRenderer } from 'src/app/shared/components/button-rendrer/button_rendrer';
import { StatusRendrer } from 'src/app/shared/components/status-rendrer/status_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';
import { AddCategoryComponent } from 'src/app/shared/dialogs/add-category/add-category.component';
import {
  CategoryMaster,
  CategoryRequestData,
} from '../../data-models/category/game_category.model';
import { StoreService } from '../../services/store-service/store.service';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  activeCategoryView: string | undefined;
  defaultColDef = {
    filter: false,
    floatingFilter: true,
    wrapText: true,
    sortable: true,
    autoHeight: true,
  };

  columnDefs = [
    { field: 'cat_display_name_en', headerName: 'Category' },
    { field: 'cat_display_name_hn', headerName: 'Category (hindi)' },
    {
      field: 'is_active',
      headerName: 'Status',
      cellRenderer: 'statusRendrer',
      cellRendererParams: (params: any) => ({
        className:(params.data as CategoryRequestData).is_active
        ? 'badge-success'
        : 'badge-primary',
        text: (params.data as CategoryRequestData).is_active
          ? 'Active'
          : 'in-active',
        clicked: () => {},
      }),
    },
    { field: 'Action',
    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as CategoryRequestData).is_active,
      clicked:(value:boolean)=>{
        this.storeService.updateCategory({...params.data,is_active:value})
      }
    })
   },
  ];
  frameworkComponents = {
    statusRendrer: StatusRendrer,
    btnRendrer:BtnCellRenderer,
    switchRendrer:SwitchCellRendrer
  };
  categoryMasterData: CategoryMaster | undefined;
  rowData: CategoryRequestData[] | undefined;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllCategories$.subscribe((val) => {
      if (val) {
        this.categoryMasterData = val;
      if(!this.activeCategoryView){
        this.activeCategoryView = Object.keys(this.categoryMasterData)[0];
      }
        this.rowData = this.categoryMasterData[this.activeCategoryView];

      }
    });
    this.storeService.loadAllCategories();
  }

  openAddCategory() {
    if(this.activeCategoryView){
    this.storeService.createNewCategory(this.activeCategoryView);
    }
  }

  get categoryKeys() {
    if (this.categoryMasterData) {
      return Object.entries(this.categoryMasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    
    if (this.categoryMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.categoryMasterData[this.activeCategoryView];
    }
  }
}
