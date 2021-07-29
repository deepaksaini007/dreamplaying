import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular_material.module';
import { LoadingModule } from './modules/loading';
import { ConfirmationDialogComponent } from './shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { getBAseUrl } from './core/providers/get_base_url';
import { UsersComponent } from './core/components/users/users.component';
import { AddNewsComponent } from './shared/dialogs/add-news/add-news.component';
import { NewslistComponent } from './core/components/newslist/newslist.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './shared/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddStoryComponent } from './shared/dialogs/add-story/add-story.component';
import { AddCategoryComponent } from './shared/dialogs/add-category/add-category.component';
import { StorylistComponent } from './core/components/storylist/storylist.component';
import { CategorylistComponent } from './core/components/categorylist/categorylist.component';
import { FAQlistComponent } from './core/components/faqlist/faqlist.component';
import { SubCategoryComponent } from './core/components/sub-category/sub-category.component';
import { TiplistComponent } from './core/components/tiplist/tiplist.component';
import { MasterSettingComponent } from './core/components/master-setting/master-setting.component';
import { reducers, metaReducers } from './store/reducers';
import { allHttpInterceptorProviders } from './core/interceptors/interceptors';
import { AddFaqComponent } from './shared/dialogs/add-faq/add-faq.component';
import { AddTipComponent } from './shared/dialogs/add-tip/add-tip.component';
import { AddVideoComponent } from './shared/dialogs/add-video/add-video.component';
import { VideolistComponent } from './core/components/videolist/videolist.component';
import { effects } from './store/effects';
import { ToastrModule } from 'ngx-toastr';
import { StatusRendrer } from './shared/components/status-rendrer/status_rendrer';
import { BtnCellRenderer } from './shared/components/button-rendrer/button_rendrer';
import { HtmlRendrer } from './shared/components/html-rendrer/html-rendrer';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SwitchCellRendrer } from './shared/components/switch_cell/switch_cell.view';
import { TeamlistComponent } from './core/components/teamlist/teamlist.component';

import { AddPredictionComponent } from './shared/dialogs/add-prediction/add-prediction.component';
import { AddTeamComponent } from './shared/dialogs/add-team/add-team.component';
import { PredictionlistComponent } from './core/components/predictionlist/predictionlist.component';
import { AddMatchComponent } from './shared/dialogs/add-match/add-match.component';
import { ImageRendrer } from './shared/components/image-rendrer/image_rendrer';
import { TeamLogoRendrer } from './shared/components/team-logo-rendrer/team_logo_rendrer';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DreamTimePipe } from './shared/pipes/dreamTime/dream-time.pipe';
import { EditMatchComponent } from './shared/dialogs/edit-match/edit-match.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NoRowsGridComponent } from './shared/components/no-data/no-data.component';
import { AdminUsersComponent } from './core/components/admin-users/admin-users.component';
import { RegisterUserDialogComponent } from './shared/dialogs/register-user-dialog/register-user-dialog.component';
import { PasswordEyeRendrerComponent } from './shared/components/password-eye-rendrer/password-eye-rendrer.component';
import { AddMasterComponent } from './shared/dialogs/add-master/add-master.component';
import { MasteradminComponent } from './core/components/masteradmin/masteradmin.component';
import { PasswordComponent } from './shared/dialogs/password/password.component';
import { MenuDropDownRendrer } from './shared/components/menudropdown_rendrer/menu_dropdown_rendrer';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SurveylistComponent } from './core/components/surveylist/surveylist.component';
import { ViewSurveyComponent } from './shared/dialogs/view-survey/view-survey.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    DashboardComponent,
    HeaderComponent,
    UsersComponent,
    AddNewsComponent,
    NewslistComponent,
    LoginComponent,
    AddStoryComponent,
    AddCategoryComponent,
    StorylistComponent,
    CategorylistComponent,
    FAQlistComponent,
    SubCategoryComponent,
    TiplistComponent,
    MasterSettingComponent,
    AddFaqComponent,
    AddTipComponent,
    AddVideoComponent,
    VideolistComponent,
    StatusRendrer,
    BtnCellRenderer,
    HtmlRendrer,
    ImageUploadComponent,
    SwitchCellRendrer,
    NoRowsGridComponent,
    TeamlistComponent,
    ImageRendrer,
    AddPredictionComponent,
    AddTeamComponent,
    PredictionlistComponent,
    AddMatchComponent,
    TeamLogoRendrer,
    DreamTimePipe,
    EditMatchComponent,
    CardDetailComponent,
    AdminUsersComponent,
    RegisterUserDialogComponent,
    PasswordEyeRendrerComponent,
    AddMasterComponent,
    MasteradminComponent,
    PasswordComponent,
    MenuDropDownRendrer,
    FooterComponent,
    SurveylistComponent,
    ViewSurveyComponent,

  ],
  imports: [
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    LoadingModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatDatepickerModule,
    AgGridModule,
    MatSelectModule,
    NgxFileDropModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    ChartsModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    AgGridModule.withComponents([]),
    MatSlideToggleModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
  ],
  exports: [MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,],
  providers: [
    { provide: "BASE_API_URL", useFactory: getBAseUrl, deps: [] },
    ...allHttpInterceptorProviders
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
