import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SongService } from './../../services/songs.service';
import { Observable } from 'rxjs/Observable'; // We add this so newly added songs or bands (by other app instances) are shown in this app

import { Race } from '../../models/race.model';

/**
 * Generated class for the ViewracePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewrace',
  templateUrl: 'viewrace.html',
})
export class ViewracePage {

  race: Race = {
    name: '',
    country: '',
    startdate: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.race = navParams.get('item');
    console.log(this.race)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewracePage');
  }

}
