import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './core/components/admin-users/admin-users.component';
import { CategorylistComponent } from './core/components/categorylist/categorylist.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { FAQlistComponent } from './core/components/faqlist/faqlist.component';
import { MasterSettingComponent } from './core/components/master-setting/master-setting.component';
import { MasteradminComponent } from './core/components/masteradmin/masteradmin.component';
import { NewslistComponent } from './core/components/newslist/newslist.component';
import { PredictionlistComponent } from './core/components/predictionlist/predictionlist.component';
import { StorylistComponent } from './core/components/storylist/storylist.component';
import { SurveylistComponent } from './core/components/surveylist/surveylist.component';
import { TeamlistComponent } from './core/components/teamlist/teamlist.component';
import { TiplistComponent } from './core/components/tiplist/tiplist.component';
import { VideolistComponent } from './core/components/videolist/videolist.component';
import { AdminGuard } from './core/guards/Admin/admin.guard';
import { AuthenticationGuard } from './core/guards/Authentication/authentication.guard';
import { SyncHelperGuard } from './core/guards/SyncGuard/sync-helper.guard';
import { UserRoleGuard } from './core/guards/UserRole/user-role.guard';
import { AddNewsComponent } from './shared/dialogs/add-news/add-news.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard]
    }
  },
  {
    path: 'news',
    component: NewslistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'new',
    component: AddNewsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'stories',
    component: StorylistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'category',
    component: CategorylistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'faq',
    component: FAQlistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'tips',
    component: TiplistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'master-setting',
    component: MasterSettingComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'teams',
    component: TeamlistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'prediction',
    component: PredictionlistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'videos',
    component: VideolistComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,UserRoleGuard]
    }
  },
  {
    path: 'manageUsers',
    component: AdminUsersComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,AdminGuard]
    }
  },
  {
    path:'app-details',
    component:MasteradminComponent,
   canActivate:[AuthenticationGuard]
  } ,
  {
    path:'survey',
    component:SurveylistComponent,
   canActivate:[AuthenticationGuard]
  } ,
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
