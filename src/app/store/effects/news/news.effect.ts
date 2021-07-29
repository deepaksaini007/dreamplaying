import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { NewsRequestData } from 'src/app/core/data-models/news/news.model';
import { NewsService } from 'src/app/core/services/news/news.service';
import { AddNewsComponent } from 'src/app/shared/dialogs/add-news/add-news.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromNewsActions from '../../actions/news';
import { CREATE_NEWS_ACTION_EVENT, NEWS_ACTION_EVENT } from '../../actions/news';
//import all requried services or any dependencies

@Injectable()
export class NewsEffects {
    constructor(private actions$: Actions,private dialog:MatDialog,private newsService:NewsService,private spinnerService:NgxSpinnerService) { }

    createNewNews$ = createEffect(()=>
        this.actions$.pipe(
            ofType<fromNewsActions.CreateNewsActionsEvent>(fromNewsActions.CREATE_NEWS_ACTION_EVENT),
            exhaustMap((action)=>{
               let dialogRef =  this.dialog.open(AddNewsComponent,{
                   data:{
                    news:action.newsRequest,
                    categoryName:action.categoryName
                   }
               });
                return dialogRef.afterClosed()
            }),
            mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
            this.newsService.addNews((dialogData.data as NewsRequestData)).pipe(
                map((data)=>new fromNewsActions.CreateNewsActionsEventSuccess(data)),
                catchError(err=>of(new fromNewsActions.CreateNewsActionsEventFail(err)))
            ):of(new fromNewsActions.CreateNewsActionsEventFail("Dialog Closed")))
        )
    )


    updateNews$ = createEffect(()=>
        this.actions$.pipe(
            ofType<fromNewsActions.UpdateNewsActionsEvent>(fromNewsActions.UPDATE_NEWS_ACTION_EVENT),
            exhaustMap((action)=>{
                if(!action.isActiveStatusChanged){
               let dialogRef =  this.dialog.open(AddNewsComponent,{
                   data:{
                    news:action.payload,
                    categoryName:undefined
                   }
               });
                return dialogRef.afterClosed()
            }else{
                return of({status:true,data:{...action.payload}})
            }
            }),
            mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
            this.newsService.updateNews((dialogData.data as NewsRequestData)).pipe(
                map((data)=>new fromNewsActions.UpdateNewsActionsEventSuccess(data)),
                catchError(err=>of(new fromNewsActions.UpdateNewsActionsEventFail(err)))
            ):of(new fromNewsActions.UpdateNewsActionsEventFail("dialog closed")))
        )
    )


    publishNews$ = createEffect(()=>
        this.actions$.pipe(
            ofType<fromNewsActions.PublishNewsAction>(fromNewsActions.PUBLISH_NEWS_ACTION),
            exhaustMap((action)=>{
               let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
                   data:{data:{...action.newsRequest},title:'Publish news',description:"Are you sure you want to publish this news "}
               });
                return dialogRef.afterClosed()
            }),
            mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
            this.newsService.publishNews((dialogData.data as NewsRequestData)).pipe(
                map((data)=>new fromNewsActions.PublishNewsActionSuccess(data)),
                catchError(err=>of(new fromNewsActions.PublishNewsActionFail(err)))
            ):of(new fromNewsActions.PublishNewsActionFail("Dialog Closed")))
        )
    )

    getAllNews$ = createEffect(()=>
        this.actions$.pipe(
            ofType<fromNewsActions.LoadNewsActionsEvent>(fromNewsActions.NEWS_ACTION_EVENT),
            mergeMap((action)=>
            this.newsService.getAllNews().pipe(
                map((data)=>new fromNewsActions.LoadNewsActionsEventSuccess(data)),
                catchError(err=>of(new fromNewsActions.LoadNewsActionsEventFail(err)))
            ))
        )
    )

    createNewsSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromNewsActions.TRUNCATE_ALL_NEWS_SUCCESS,fromNewsActions.CREATE_NEWS_ACTION_EVENT_SUCCESS,fromNewsActions.PUBLISH_NEWS_ACTION_SUCCESS,fromNewsActions.UPDATE_NEWS_ACTION_EVENT_SUCCESS,fromNewsActions.DELETE_NEWS_ACTION_SUCCESS),
            map(() => new fromNewsActions.LoadNewsActionsEvent())
        )
    );
    deleteNews$ = createEffect(()=>
    this.actions$.pipe(
        ofType<fromNewsActions.DeleteNewsAction>(fromNewsActions.DELETE_NEWS_ACTION),
        exhaustMap((action)=>{
           let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
               data:{data:{...action.newsRequest},title:'Delete News',description:'Are you sure you want to delete this news'}
           });
            return dialogRef.afterClosed()
        }),
        mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
        this.newsService.deleteNews((dialogData.data as NewsRequestData)).pipe(
            map((data)=>new fromNewsActions.DeleteNewsActionSuccess(data)),
            catchError(err=>of(new fromNewsActions.DeleteNewsActionFail(err)))
        ):of(new fromNewsActions.DeleteNewsActionFail("Dialog Closed")))
    )
)



truncateNews$ = createEffect(()=>
    this.actions$.pipe(
        ofType<fromNewsActions.TruncateNews>(fromNewsActions.TRUNCATE_ALL_NEWS),
        exhaustMap((action)=>{
           let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
               data:{data:{...action.newsRequest},title:'Delete All News',description:'Are you sure you want to delete all the news'}
           });
            return dialogRef.afterClosed()
        }),
        mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
        this.newsService.deleteNews((dialogData.data as NewsRequestData)).pipe(
            map((data)=>new fromNewsActions.TruncateNewsSuccess(data)),
            catchError(err=>of(new fromNewsActions.TruncateNewsFail(err)))
        ):of(new fromNewsActions.TruncateNewsFail("Dialog Closed")))
    )
)
}
