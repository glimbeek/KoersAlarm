import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';

@IonicPage()
@Component({
  selector: 'page-koers',
  templateUrl: 'koers.html',
})
export class KoersPage {

  token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebase: Firebase) {

      this.firebase.getToken()
      .then(token => 
        console.log(`The token is ${token};
        this.token = ${token}`)
      ) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));

  }


}
