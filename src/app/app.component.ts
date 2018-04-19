import { Component, Inject, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { rootRenderNodes } from '@angular/core/src/view';

// Push Notifications stuff
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';


@Component({
  // templateUrl: 'app.html'
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  @ViewChild('myNav') nav:NavController
  public rootPage:string = 'HomePage';
  // rootPage:any = LoginPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private angularFireAuth: AngularFireAuth,
              fcm: FcmProvider,
              toastCtrl: ToastController) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      if (!platform.is('cordova')) {
        const toast = toastCtrl.create({
          message: "Not running on a Cordova platform",
          duration: 3000
        });
        toast.present();    
      }
      else {
        const toast = toastCtrl.create({
          message: "Seems we are running on a Cordova platform",
          duration: 3000
        });
        toast.present(); 

        // Get a FCM token
        fcm.getToken()

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

