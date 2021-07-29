import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsData, NewsRequestData } from '../../data-models/news/news.model';
import {
  GET_ALL_NEWS,
  ADD_NEW_NEWS,
  PUBLISH_NEWS,
  EDIT_NEWS,
  DELETE_NEWS,
  TRUNCATE_NEWS,
} from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  addNews(news: NewsRequestData): Observable<NewsRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(ADD_NEW_NEWS, news)
      .pipe(map((data) => data.responseData?.data as NewsRequestData));
  }

  getAllNews(): Observable<NewsData> {
    return this.httpClient
      .get<BaseResponseModel>(GET_ALL_NEWS)
      .pipe(map((data) => data.responseData?.data as NewsData));
  }

  publishNews(newsRequest: NewsRequestData): Observable<NewsRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(PUBLISH_NEWS, newsRequest)
      .pipe(map((data) => data.responseData?.data as NewsRequestData));
  }
  deleteNews(newsRequest: NewsRequestData): Observable<NewsRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(DELETE_NEWS, newsRequest)
      .pipe(map((data) => data.responseData?.data as NewsRequestData));
  }

  updateNews(newsRequestData: NewsRequestData): Observable<NewsRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(EDIT_NEWS, newsRequestData)
      .pipe(map((data) => data.responseData?.data as NewsRequestData));
  }

  truncateNews(newsRequestData:NewsRequestData):Observable<NewsRequestData>{
    return this.httpClient.post<BaseResponseModel>(TRUNCATE_NEWS,newsRequestData).pipe(
      map((data)=>data.responseData?.data as NewsRequestData)
    )
  }
}
