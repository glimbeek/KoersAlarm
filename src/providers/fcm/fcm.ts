import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/******
 * SOURCE:
 * https://www.youtube.com/watch?v=SOOjamH1bAA
 * https://angularfirebase.com/lessons/ionic-native-with-firebase-fcm-push-notifications-ios-android/
 * 
 * ANDROID:
 * Had to implement the following "fix" to get it to work:
 * https://github.com/arnesson/cordova-plugin-firebase/issues/607
 * Changed the ".\KoersAlarm\plugins\cordova-plugin-firebase\scripts\after_prepare.js" file on line: 28
 * 
 * 
 * IOS:
 * Still need to enable PUSH NOTIFICIONS in XCODE once we get a Apple Dev Account
 * 
 ******/

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    public toastCtrl: ToastController
  ) {}

  // Get permission from the user
  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    // Web app
    if (!this.platform.is('cordova')) {
      let toast = this.toastCtrl.create({
        message: 'We need a cordova platform for this to work',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if (!token) {
      console.log('No token')
      return; // If we don't have a token we just return
    }

    const devicesRef = this.afs.collection('devices') // Make a reference to the devices collection in firestore

    // the goal is to send a message to every device a user has registered
    const docData = { 
      token,
      userId: 'testUser',
    }

    return devicesRef.doc(token).set(docData)

  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen() // This returns an observable which we can use in the front-end
  }

}
