import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { MatRadioModule } from '@angular/material/radio';


import { AppComponent } from './app.component';
import { LandingComponent } from './components/WelcomePage/WP.component';
import { HomeComponent } from './components/Home/home.component';
import { LoginComponent } from './components/Login/login.component';
import { SignUpComponent } from './components/Sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { MapComponent } from './components/Map/map.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { Map1Component } from './components/Map1/map1.component';
import { ThanksComponent } from './components/Thanks/thanks.component';
import { ContactComponent } from './components/Contact/contact.component';
import { SettingsComponent } from './components/Instruction/settings.component';



export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    MapComponent,
    ReactiveFormsComponent,
    Map1Component,
    ThanksComponent,
    ContactComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTreeModule,
    MatDividerModule,
    MatSelectModule,
    MatRadioModule,
    LeafletModule,
    LeafletDrawModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(()=>getStorage()),
    HotToastModule.forRoot(),
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
