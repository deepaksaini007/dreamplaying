import { AdminEffects } from "./admin";
import { AuthorizationEffects } from "./authorization";
import { CategoryEffects } from "./category";
import { FaqEffects } from "./faqs/faq.effects";
import { FeedbackEffects } from "./feedbacks";
import { MasterAppDataEffects } from "./master-app-data";
import { NewsEffects } from "./news/news.effect";
import { MatchPredictionEffects } from "./predictions";
import { StroyEffects } from "./story/story.effect";
import { SurveyEffects } from "./surveys";
import { TeamEffects } from "./teams";
import { TipEffects } from "./tips/tips.effect";
import { VideoEffects } from "./videos/video.effect";

export const effects:any[] = [
   CategoryEffects,
   NewsEffects,
   AuthorizationEffects,
   FeedbackEffects,
   StroyEffects,
   FaqEffects,
   TipEffects,
   VideoEffects,
   TeamEffects,
   MatchPredictionEffects,
   AdminEffects,
   MasterAppDataEffects,
   SurveyEffects
]
