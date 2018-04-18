import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/******
 * SOURCE:
 * https://www.youtube.com/watch?v=SOOjamH1bAA
 *
 ******/

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
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
      // We do nothing
    }

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if (!token) return; // If we don't have a token we just return
    const devicesRef = this.afs.collection('devices') // Make a reference to the devices collection in firestore

    // the goal is to send a message to every device is user has registered
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
