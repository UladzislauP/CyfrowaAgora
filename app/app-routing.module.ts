import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/WelcomePage/WP.component';
import { LoginComponent } from './components/Login/login.component';
import { SignUpComponent } from './components/Sign-up/sign-up.component';
import { HomeComponent } from './components/Home/home.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { MapComponent } from './components/Map/map.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { Map1Component } from './components/Map1/map1.component';
import { ThanksComponent } from './components/Thanks/thanks.component';
import { ContactComponent } from './components/Contact/contact.component';
import { SettingsComponent } from './components/Instruction/settings.component';



const redirectToLogin =() =>redirectUnauthorizedTo(['login']);
const redirectToHome =() => redirectLoggedInTo(['home'])
const redirectToForm =() => redirectLoggedInTo(['reactive-forms'])

const routes: Routes =[
  {
    path:'',
    pathMatch:'full',
    component: LandingComponent
  },
  {
    path:'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToForm)
  },
  {
    path:'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path:'map',
    component:MapComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path:'map1',
    component:Map1Component,
    ...canActivate(redirectToLogin)
  },
  {
    path:'reactive-forms',
    component:ReactiveFormsComponent,
    ...canActivate(redirectToHome)
  },
  {
    path:'thanks',
    component:ThanksComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path:'contact',
    component:ContactComponent,
    ...canActivate(redirectToLogin)
  },
  {
  path: 'settings',
  component:SettingsComponent,
  ...canActivate(redirectToLogin)
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
