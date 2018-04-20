import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database' // For Push Notifications
import { Firebase } from '@ionic-native/firebase';

import { FIREBASE_CONFIG } from './firebase.credentials'; // This is for webbased testing only

import { SongService } from '../services/songs.service';

import { EmailComposer } from '@ionic-native/email-composer';
import { FcmProvider } from '../providers/fcm/fcm';

import { LocalNotifications } from '@ionic-native/local-notifications'; 

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AngularFireAuth,
    EmailComposer,
    SongService,
    Firebase,
    FcmProvider,
    LocalNotifications
  ]
})
export class AppModule {}
