import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { FaQData, FAQRequestData } from 'src/app/core/data-models/faq/faq.model';
import { FaqsService } from 'src/app/core/services/faqs/faqs.service';
import { AddFaqComponent } from 'src/app/shared/dialogs/add-faq/add-faq.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DeleteFaqEventAction, DeleteMasterAppDataFail } from '../../actions';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromFaqActions from '../../actions/faqs';
//import all requried services or any dependencies

@Injectable()
export class FaqEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private faqService: FaqsService
  ) {}

  creeateFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromFaqActions.CreateFaqEventAction>(
        fromFaqActions.CREATE_FAQ_EVENT_ACTION
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddFaqComponent, {
          data: {
            categoryName: action.categoryName,
          },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.faqService
              .createNewFaq(dialogData.data as FAQRequestData)
              .pipe(
                map(
                  (data) => new fromFaqActions.CreateFaqEventActionSuccess(data)
                ),
                catchError((err) =>
                  of(new fromFaqActions.CreateFaqEventActionFail(err))
                )
              )
          : EMPTY
      )
    )
  );


  deleteFaq$ = createEffect(()=>
  this.actions$.pipe(
      ofType<fromFaqActions.DeleteFaqEventAction>
      (fromFaqActions.DELETE_FAQ_EVENT_ACTION),
      exhaustMap((action)=>{
         let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
             data:{data:{...action.payload},
             title:'Delete FAQ ?',
             description:'Are you sure you want to delete this FAQ',
             message:'Once FAQ is deleted canot be recovered'}
         });DeleteFaqEventAction
          return dialogRef.afterClosed()
      }),
      mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
      this.faqService.deletefaq((dialogData.data as FaQData)).pipe(
          map((data)=>new fromFaqActions.DeleteFaqEventActionSuccess(data)),
          catchError(err=>of(new fromFaqActions.DeleteFaqEventActionFail(err)))
      ):of(new fromFaqActions.DeleteFaqEventActionFail("Dialog Closed")))
  )
);

  getAllFaqs$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromFaqActions.LoadFaqEventAction>(
        fromFaqActions.FAQ_EVENT_ACTION
      ),
      mergeMap((action) =>
        this.faqService.getAllFaqs().pipe(
          map((data) => new fromFaqActions.LoadFaqEventActionSuccess(data)),
          catchError((err) =>
            of(new fromFaqActions.LoadFaqEventActionFail(err))
          )
        )
      )
    )
  );
  updateFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromFaqActions.UpdateFaqEventAction>(
        fromFaqActions.UPDATE_FAQ_EVENT_ACTION
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddFaqComponent, {
          data: {
            faq: { ...action.payload },
          },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.faqService.editfaq(dialogData.data as FAQRequestData).pipe(
              map(
                (data) => new fromFaqActions.UpdateFaqEventActionSuccess(data)
              ),
              catchError((err) =>
                of(new fromFaqActions.UpdateFaqEventActionFail(err))
              )
            )
          : EMPTY
      )
    )
  );
  createNewFaqSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromFaqActions.CreateFaqEventActionSuccess>(
        fromFaqActions.CREATE_FAQ_EVENT_ACTION_SUCCESS,

      ),
      map(() => new fromFaqActions.LoadFaqEventAction())
    )
  );

  onDataAddedOrUpdated$ = createEffect(()=>this.actions$.pipe(
    ofType(
      fromFaqActions.CREATE_FAQ_EVENT_ACTION_SUCCESS,
      fromFaqActions.UPDATE_FAQ_EVENT_ACTION_SUCCESS,
      fromFaqActions.DELETE_FAQ_EVENT_ACTION_SUCCESS,
    ),
    map((data) => new fromFaqActions.LoadFaqEventAction())
  ));
}
