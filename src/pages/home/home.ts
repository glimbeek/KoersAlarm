import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KoersPage } from '../koers/koers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: any;

  constructor(public navCtrl: NavController) {
  }

  doKoers() {
    this.navCtrl.push(KoersPage);
  }

}
