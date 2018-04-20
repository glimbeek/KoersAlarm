import { Component, Inject, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { rootRenderNodes } from '@angular/core/src/view';

// Push Notifications Stuff
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';

// Local Notifications Stuff
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@Component({
  // templateUrl: 'app.html'
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  @ViewChild('myNav') nav:NavController
  public rootPage:string = 'HomePage';
  // rootPage:any = LoginPage;


  // notifications: any[] = [];

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private angularFireAuth: AngularFireAuth,
              fcm: FcmProvider,
              toastCtrl: ToastController,
              localNotifications: LocalNotifications) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      if (!platform.is('cordova')) {
        // Do nothing
      }
      else {

        // Get a FCM token
        fcm.getToken()

        // Listen to FIREBASE incoming notifications
        fcm.listenToNotifications().pipe(
        tap(msg => {
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
        )
        .subscribe()

        // Local notifications
        let notification = {
          // id: day.dayCode,
          title: 'Hey!',
          text: 'You just got notified :)',
          // at: firstNotificationTime,
          // every: 'week'
        };

        console.log("Sending a notification: " , notification)
        // this.notifications.push(notification);

        // localNotifications.schedule({
        //   title: 'Justin Rhyss',
        //   text: 'Do you want to go see a movie tonight?'     
        // })



      }










      // Auth bit which we dont use anymore
      // angularFireAuth.auth.onAuthStateChanged(function(user) {
      //   if (user) {
      //     this.rootPage = 'HomePage';          
      //   }
      //   else {
      //     this.rootPage = 'LoginPage';
      //   }
      // });
    });
  }

  ionViewDidLoad() {

  }

}

