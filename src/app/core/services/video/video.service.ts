import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_VIDEOS, ADD_NEW_VIDEO,PUBLISH_VIDEO,UPDATE_VIDEO, DELETE_VIDEO, TRUNCATE_VIDEO  } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { VideoData, VideoRequestData } from '../../data-models/videos/videos.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient:HttpClient) { }

  getAllVideos():Observable<VideoData>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_VIDEOS).pipe(
      map((data)=>data.responseData?.data as VideoData)
    )
  }
  createNewVideo(video:VideoRequestData):Observable<VideoRequestData>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_VIDEO,video).pipe(
      map((data)=>data.responseData?.data as VideoRequestData)
    )
  }

  publishVideo(videoRequestData:VideoRequestData):Observable<VideoRequestData>{
    return this.httpClient.post<BaseResponseModel>(PUBLISH_VIDEO,videoRequestData).pipe(
      map((data)=>data.responseData?.data as VideoRequestData)
    )
  }
  deleteVideo(videoRequestData:VideoRequestData):Observable<VideoRequestData>{
    return this.httpClient.post<BaseResponseModel>(DELETE_VIDEO,videoRequestData).pipe(
      map((data)=>data.responseData?.data as VideoRequestData)
    )
  }
  updateVideo(videoRequestData:VideoRequestData):Observable<VideoRequestData>{
    return this.httpClient.post<BaseResponseModel>(UPDATE_VIDEO,videoRequestData).pipe(
      map((data)=>data.responseData?.data as VideoRequestData)
    )
  }

  truncateVideo(videoRequestData:VideoRequestData):Observable<VideoRequestData>{
    return this.httpClient.post<BaseResponseModel>(TRUNCATE_VIDEO,videoRequestData).pipe(
      map((data)=>data.responseData?.data as VideoRequestData)
    )
  }
}
