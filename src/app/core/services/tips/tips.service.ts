import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_TIPS, ADD_NEW_TIP, UPDATE_TIP ,DELETE_TIP} from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { TipData, TipRequestData } from '../../data-models/tip/tip.model';

@Injectable({
  providedIn: 'root',
})
export class TipsService {
  constructor(private httpClient: HttpClient) {}

  getAllTips(): Observable<TipData> {
    return this.httpClient
      .get<BaseResponseModel>(GET_ALL_TIPS)
      .pipe(map((data) => data.responseData?.data as TipData));
  }
  createNewTip(tip: TipRequestData): Observable<TipRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(ADD_NEW_TIP, tip)
      .pipe(map((data) => data.responseData?.data as TipRequestData));
  }
  deleteTip(tip:TipRequestData){
    return this.httpClient.post<BaseResponseModel>(DELETE_TIP,tip).pipe(
      map((data)=>data.responseData?.data as TipRequestData)
    )
  }
  editTip(tip: TipRequestData): Observable<TipRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_TIP, tip)
      .pipe(map((data) => data.responseData?.data as TipRequestData));
  }
}
