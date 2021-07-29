import { CategoryMaster } from './category/game_category.model';
import { DashboardMenu } from './dashboard-menu/indes';
import { FaQData } from './faq/faq.model';
import { MasterAppData } from './master-app-data';
import { NewsData } from './news/news.model';
import { TipData } from './tip/tip.model';

export interface BaseResponseModel {
  doLogOut?: boolean;
  languageCode?: string;
  responseData?: ResponseData;
  responseMsg?: ResponseMsg;
}

export interface ResponseData {
  data?: CategoryMaster|FaQData|TipData|NewsData|MasterAppData|DashboardMenu[];
  isObject?: boolean;
  isCollection?: boolean;
  responseDataType?: string;
}

export interface ResponseMsg {
  isError?: boolean;
  errorMessage?: string;
  isWarning?: boolean;
  warningMessage?: string;
  isEmptyCollection?: boolean;
  successMessage?: string;
  exceptionModel?: null;
}
