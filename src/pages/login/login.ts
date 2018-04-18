import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public angularFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  doRegister(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then((res) => {
      this.navCtrl.setRoot('RegisterPage', {email});
    });
  }


  doLogin(email, password) {
    this.angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password).then((user) => {
      this.navCtrl.setRoot('HomePage', {email});
    });
  }

  presentToast(msgString) {
    let toast = this.toastCtrl.create({
      message: msgString,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
