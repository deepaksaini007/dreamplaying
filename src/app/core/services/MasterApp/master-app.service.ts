import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ADD_MASTER_APP_DATA_ENDPOINT,
  GET_MASTER_APP_DATA_END_POINT,
  UPDATE_MASTER_APP_DATA_ENDPOINT,
} from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import {
  AllMasterAppData,
  MasterAppData,
} from '../../data-models/master-app-data';

@Injectable({
  providedIn: 'root',
})
export class MasterAppService {
  constructor(private httpClient: HttpClient) {}

  getMasterAppData(): Observable<MasterAppData> {
    return this.httpClient
      .get<BaseResponseModel>(GET_MASTER_APP_DATA_END_POINT)
      .pipe(map((data) => data.responseData?.data as MasterAppData));
  }

  createNewMasterAppData(
    appMasterData: AllMasterAppData
  ): Observable<AllMasterAppData> {
    return this.httpClient
      .post<BaseResponseModel>(ADD_MASTER_APP_DATA_ENDPOINT, appMasterData)
      .pipe(map((data) => data.responseData?.data as AllMasterAppData));
  }

  updateMasterAppDataRecord(
    appMasterData: AllMasterAppData
  ): Observable<AllMasterAppData> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_MASTER_APP_DATA_ENDPOINT, appMasterData)
      .pipe(map((data) => data.responseData?.data as AllMasterAppData));
  }
}
