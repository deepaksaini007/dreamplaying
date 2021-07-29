import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_FAQS, ADD_NEW_FAQ, UPDATE_FAQ ,DELETE_FAQ} from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { FaQData, FAQRequestData } from '../../data-models/faq/faq.model';
@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private httpClient:HttpClient) { }

  createNewFaq(faq:FAQRequestData):Observable<any>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_FAQ,faq).pipe(
      map(data=>data.responseData?.data as FAQRequestData)
    )
  }
  getAllFaqs():Observable<FaQData>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_FAQS).pipe(
      map(data=>data.responseData?.data as FaQData)
    )
  }
  deletefaq(faqRequest:FAQRequestData){
    return this.httpClient.post<BaseResponseModel>(DELETE_FAQ,faqRequest).pipe(
      map((data)=>data.responseData?.data as FAQRequestData)
    )
  }

  editfaq(faqRequest:FAQRequestData){
    return this.httpClient.post<BaseResponseModel>(UPDATE_FAQ,faqRequest).pipe(
      map((data)=>data.responseData?.data as FAQRequestData)
    )
  }
}
