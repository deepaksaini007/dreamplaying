import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
  import { Inject, Injectable } from "@angular/core";
  import { Store } from "@ngrx/store";
  import * as fromStore from "../../store";
  import { Observable, throwError } from "rxjs";
  import { catchError, concatMap, map, take } from "rxjs/internal/operators";
  import { environment } from "src/environments/environment";
  import { DO_NOT_ADD_TOKEN } from "../constants";
import { AuthorizationService } from "../services/authorization/authorization.service";
  @Injectable({
    providedIn: "root",
  })
  export class BaseHttpInterceptor implements HttpInterceptor {
    constructor(
      @Inject("BASE_API_URL") private baseUrl: string,
      private authorizationService: AuthorizationService,
      private store: Store<fromStore.State>
    ) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return this.store.select(fromStore.getLoggedInUser).pipe(
        take(1),
        concatMap((userProfile) => {       
          let tokenData: string|null = null;
        //   if (!req.headers.has(DO_NOT_ADD_TOKEN)) {
        //     tokenData = localStorage.getItem("tokenData");
        //     if (!tokenData) {
        //       this.authorizationService.logoutUser();
        //       return throwError("Token Data not found");
        //     }
        //   }
          const apiReq = req.clone({
            url: `${this.baseUrl}/${req.url}`,
            headers: req.headers
              .set("Custom-Key", environment.authKey)
              .set("Authorization", `Bearer ${tokenData}`)
              .set("user_agent","web-"+window.navigator.userAgent.substr(0,76))
             .delete(DO_NOT_ADD_TOKEN),
          });
          return next.handle(apiReq);
        })
      );
    }
  }
  