import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseResponseModel } from "../data-models/base_response.model";
import { AuthorizationService } from "../services/authorization/authorization.service";

@Injectable({
    providedIn: "root",
  })
  export class ErrorInterceptor implements HttpInterceptor {
      constructor( private toastService: ToastrService,
        private authorizationService: AuthorizationService) {
          
      }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event:HttpEvent<any>)=>{
                if (event instanceof HttpResponse) {
                    let baseResponseModel: BaseResponseModel = event.body as BaseResponseModel;
                    if (
                        baseResponseModel.doLogOut &&
                        baseResponseModel.doLogOut === true
                      ) {
                        this.authorizationService.logoutUser();
                        throw new HttpErrorResponse({
                            error:
                              (baseResponseModel?.responseMsg?.isError
                                ? baseResponseModel.responseMsg.errorMessage
                                : baseResponseModel?.responseMsg?.isWarning
                                ? baseResponseModel?.responseMsg?.warningMessage
                                : undefined) ?? "You have been logged out of the app",
                            headers: event.headers,
                            status: 500,
                            statusText: "Error",
                            url:event.url!
                          });
                      }

                      if (baseResponseModel.responseMsg) {
                        if (
                            baseResponseModel.responseMsg.isError ||
                            baseResponseModel.responseMsg.isWarning
                          ) {
                            throw new HttpErrorResponse({
                                error: baseResponseModel.responseMsg.isError
                                  ? baseResponseModel.responseMsg.errorMessage
                                  : baseResponseModel.responseMsg.isWarning
                                  ? baseResponseModel.responseMsg.warningMessage
                                  : "Please contact app administrator",
                                headers: event.headers,
                                status: 500,
                                statusText: "Error",
                                url: event.url!,
                              });
                          }
                          if (baseResponseModel.responseMsg.successMessage) {
                            this.toastService.success(
                              baseResponseModel.responseMsg.successMessage
                            );
                          }
                      }
                      
                }
                return event;
                
            }),
            catchError((error:HttpErrorResponse)=>{
                this.toastService.error(error.error);
                return throwError(error.error)
                // return throwError(error.error);
            })
        )  as Observable<HttpEvent<any>>;
    }

  }