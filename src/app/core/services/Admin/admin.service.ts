import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ALL_USERS_ENDPOINT,
  ADD_NEW_USER_ENDPOINT,
  UPDATE_USER_ENDPOINT,
  DELETE_USER_ENDPOINT,
} from '../../constants';
import { UserData } from '../../data-models/auth-response/auth_response.data';
import { BaseResponseModel } from '../../data-models/base_response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getAllRegisteredUsers(): Observable<UserData[]> {
    return this.httpClient
      .get<BaseResponseModel>(ALL_USERS_ENDPOINT)
      .pipe(map((data) => data.responseData?.data as UserData[]));
  }

  registerNewUser(userData: UserData): Observable<UserData> {
    return this.httpClient
      .post<BaseResponseModel>(ADD_NEW_USER_ENDPOINT, userData)
      .pipe(map((data) => data.responseData?.data as UserData));
  }

  updateUserProfile(userData: UserData): Observable<UserData> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_USER_ENDPOINT, userData)
      .pipe(map((data) => data.responseData?.data as UserData));
  }
  deleteUserProfile(userData: UserData): Observable<UserData> {
    return this.httpClient.post<BaseResponseModel>(DELETE_USER_ENDPOINT,userData).pipe(
      map((data)=>data.responseData?.data as UserData)
    )
  }
}
