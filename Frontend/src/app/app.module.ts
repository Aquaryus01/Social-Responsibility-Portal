import { BrowserModule } from '@angular/platform-browser';
import { NgModule, AUTO_STYLE } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule } from '@angular/forms';

//Componenets
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { Http } from '@angular/http/src/http';
import { UserService } from './services/user.service';
import { RegisterUserComponent } from './authentification/register-user/register-user.component';
import { LoginUserComponent } from './authentification/login-user/login-user.component';
import { AuthGuard } from './guards/auth.guard';
import { Auth2Guard } from './guards/auth2.guard';


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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpModule, 
              UserService, 
              AuthGuard,
              Auth2Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
