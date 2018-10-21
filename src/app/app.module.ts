import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';
import { SearchPipe } from './_pipes';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {TimeAgoPipe} from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ManufacturerRequestComponent } from './manufacturer-request/manufacturer-request.component';
import { MasterComponent } from './master/master.component';
import { Step1Component } from './srf/step1/step1.component';
import { Step2Component } from './srf/step2/step2.component';
import { Step3Component } from './srf/step3/step3.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './common/header/header.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { TestingSpecificationComponent } from './testing-specification/testing-specification.component';
import { TestingStandradComponent } from './testing-standrad/testing-standrad.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TestingTableComponent } from './testing-table/testing-table.component';
import { Step4Component } from './srf/step4/step4.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectInnerComponent } from './project-inner/project-inner.component';
import { AclComponent } from './acl/acl.component';
import { SupportComponent } from './support/support.component';
import { SrfListComponent } from './srf-list/srf-list.component';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { RequirementComponent } from './requirement/requirement.component';
import { PurposeComponent } from './purpose/purpose.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
const appRoutes :Routes = [
  { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  { path: 'send-request', component: ManufacturerRequestComponent }, 
  { path: 'home', component:HomeComponent,canActivate: [AuthGuard],
    children : [
      { path: 'dashboard', component: DashboardComponent },       
      { path: 'my-application', component: MyApplicationComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'project-inner/:id', component: ProjectInnerComponent },
      { path: 'change-password', component: ChangePasswordComponent },      
      { path: 'profile', component: ProfileComponent },
      { path: 'support', component: SupportComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'srf-list', component: SrfListComponent },
      { path: 'srf',
        children: [
          { path: 'step-1/:id', component: Step1Component },
          { path: 'step-2/:id', component: Step2Component },
          { path: 'step-3/:id', component: Step3Component },
          { path: 'step-4/:id', component: Step4Component },
        ]
      },     
      { path: 'master', 
        children : [
          { path: '', component: MasterComponent }, 
          { path: 'role-management', component: RoleManagementComponent }, 
          { path: 'product-type', component: ProductTypeComponent }, 
          { path: 'testing-standard', component: TestingStandradComponent }, 
          { path: 'user-management', component: UserManagementComponent },
          { path: 'manufacturer', component: ManufacturerComponent},
          { path: 'testing-table', component: TestingTableComponent},
          { path: 'purpose', component: PurposeComponent},
          { path: 'requirement', component: RequirementComponent},
          { path: 'sample-collection', component: SampleCollectionComponent},
          { path: 'acl/:id', component: AclComponent},
          { path: 'testing-specification', component: TestingSpecificationComponent},
        ]
      },   
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UserManagementComponent,
    RoleManagementComponent,
    ManufacturerRequestComponent,
    MasterComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    PageNotFoundComponent,
    HeaderComponent,
    ProductTypeComponent,
    MyApplicationComponent,
    TestingStandradComponent,
    SearchPipe,
    ManufacturerComponent,
    ChangePasswordComponent,
    TestingSpecificationComponent,
    TestingTableComponent,
    Step4Component,
    ProjectsComponent,
    ProjectInnerComponent,
    AclComponent,
    SupportComponent,
    SrfListComponent,
    SampleCollectionComponent,
    RequirementComponent,
    PurposeComponent,
    ProfileComponent,
    TimeAgoPipe,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    TagInputModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgDatepickerModule,
    SelectDropDownModule,
    ToastrModule.forRoot({ preventDuplicates: true}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }