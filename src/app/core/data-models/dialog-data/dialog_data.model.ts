import { UserData } from "../auth-response/auth_response.data";
import { CategoryRequestData } from "../category/game_category.model";
import { AllMasterAppData } from "../master-app-data";
import { NewsRequestData } from "../news/news.model";
import { StoryRequestData } from "../stories/stories.mode";

export interface DialogData{
    status:boolean;
    data:CategoryRequestData|NewsRequestData|StoryRequestData|UserData|AllMasterAppData
}
