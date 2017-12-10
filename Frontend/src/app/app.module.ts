import { BrowserModule } from '@angular/platform-browser';
import { NgModule, AUTO_STYLE } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http/src/http';
import { AgmCoreModule } from '@agm/core';

//Services
import { UserService } from './services/user.service';
import { IssueService } from './services/issue.service';

//Componenets
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterUserComponent } from './authentification/register-user/register-user.component';
import { LoginUserComponent } from './authentification/login-user/login-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {PostsListComponent} from './posts-list/posts-list.component'
import {PostComponent} from './posts-list/post/post.component'
import { MapComponent } from './main/map/map.component';

//Guard
import { AuthGuard } from './guards/auth.guard';
import { Auth2Guard } from './guards/auth2.guard';
import { IssueComponent } from './main/issue/issue.component';
import { AdminComponent } from './admin/admin.component';
import { OverviewComponent } from './admin/overview/overview.component';




const routes: Routes = [ 
  { path: '', component: MainComponent},
  { path: 'authenticate', component: AuthentificationComponent, canActivate: [AuthGuard]},
  { path: 'signOut', component: AuthentificationComponent, canActivate: [Auth2Guard]},
  { path: 'issues', component: PostsListComponent}, 
  { path: 'admin', component: AdminComponent},
  { path: "**", component: MainComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthentificationComponent,
    RegisterUserComponent,
    LoginUserComponent,
    NavBarComponent,
    MapComponent,
    PostsListComponent,
    PostComponent,
    IssueComponent,
    AdminComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjoYgGxB6x7Q7fRvkH9Sc6x07uqEUPT2c'
    })
  ],
  providers: [HttpModule, 
              UserService,
              IssueService, 
              AuthGuard,
              Auth2Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
