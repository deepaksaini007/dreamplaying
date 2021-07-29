import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';

// import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CategoryRequestData } from 'src/app/core/data-models/category/game_category.model';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { AddCategoryComponent } from 'src/app/shared/dialogs/add-category/add-category.component';

import * as fromCategoryActions from '../../actions/categories';
import { CREATE_CATEGORY_ACTION_EVENT_SUCCESS } from '../../actions/categories';
//import all requried services or any dependencies

@Injectable()
export class CategoryEffects {
    constructor(private action$: Actions,private categoryService:CategoryService,private dialog:MatDialog) { }

    createNewCategory$ = createEffect(()=>
        this.action$.pipe(

            ofType<fromCategoryActions.CreateCategoryActionEvent>(fromCategoryActions.CREATE_CATEGORY_ACTION_EVENT),
            exhaustMap((action)=>{
               let dialogRef =  this.dialog.open(AddCategoryComponent,{
                   data:{
                    cat_type:action.categoryType
                   }
               });
                return dialogRef.afterClosed()
            }),
            mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
            this.categoryService.createNewCategory({...dialogData.data as CategoryRequestData}).pipe(
                map((data)=>new fromCategoryActions.CreateCategoryActionEventSuccess(data)),
                catchError(err=>of(new fromCategoryActions.CreateCategoryActionEventFail(err)))
            ):EMPTY)
        )
    )
    getAllCategories$ = createEffect(()=>
        this.action$.pipe(
            ofType<fromCategoryActions.LoadCategoryActionEvent>(fromCategoryActions.CATEGORY_ACTION_EVENT),
            mergeMap((action)=>
            this.categoryService.getAllCategories().pipe(
                map((data)=>new fromCategoryActions.LoadCategoryActionEventSuccess(data)),
                catchError(err=>of(new fromCategoryActions.LoadCategoryActionEventFail(err)))
            ))
        )
    )

    createCategorySucess$ = createEffect(() =>
        this.action$.pipe(
            ofType(fromCategoryActions.CREATE_CATEGORY_ACTION_EVENT_SUCCESS,fromCategoryActions.UPDATE_CATEGORY_ACTION_EVENT_SUCCESS),
            map(() => new fromCategoryActions.LoadCategoryActionEvent())
        )
    );

    updateCategory$ = createEffect(()=>
        this.action$.pipe(

            ofType<fromCategoryActions.UpdateCategoryActionEvent>(fromCategoryActions.UPDATE_CATEGORY_ACTION_EVENT),
           
            mergeMap((action)=>
            this.categoryService.updateCategory(action.payload).pipe(
                map((data)=>new fromCategoryActions.UpdateCategoryActionEventSuccess(data)),
                catchError(err=>of(new fromCategoryActions.UpdateCategoryActionEventFail(err)))
            ))
        )
    )
}