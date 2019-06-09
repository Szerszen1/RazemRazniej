import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FirebaseUIModule, firebaseui} from 'firebaseui-angular';
import {AngularFireModule, FirebaseDatabase, FirebaseFirestore} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import EventRepository from './model/events/events-repository';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { DrinkService } from './providers/drink.service';
import { DrinksComponent } from './drinks/drinks.component';
import { IonicStorageModule } from '@ionic/Storage';
//import firestore from 'firebase/firestore';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [

    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    {
      scopes: [
        'public_profile',
        'email',
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    }/**
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    
    **/
  ],
  tosUrl: 'https://www.termsfeed.com/terms-service/8a1b2b54e8cef0e8137c6212f235aadd',
  privacyPolicyUrl: '/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};


@NgModule({
  declarations: [AppComponent,DrinksComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    HttpClientModule, 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DrinkService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: EventRepository, useFactory: (db: AngularFirestore) => { return new EventRepository(db)}, deps: [AngularFirestore]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
