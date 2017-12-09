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

//Componenets
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterUserComponent } from './authentification/register-user/register-user.component';
import { LoginUserComponent } from './authentification/login-user/login-user.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import {PostsListComponent} from './main/map/posts-list/posts-list.component'
import {PostComponent} from './main/map/posts-list/post/post.component'

//Guard
import { AuthGuard } from './guards/auth.guard';
import { Auth2Guard } from './guards/auth2.guard';
import { MapComponent } from './main/map/map.component';


const routes: Routes = [ 
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'authentification', component: AuthentificationComponent, canActivate: [Auth2Guard]}, 

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
              AuthGuard,
              Auth2Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
