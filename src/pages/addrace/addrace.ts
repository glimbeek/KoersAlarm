import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongService } from './../../services/songs.service';
import { Race } from '../../models/race.model';

/**
 * Generated class for the AddracePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrace',
  templateUrl: 'addrace.html',
})
export class AddracePage {

  race: Race = {
    name: '',
    country: '',
    startdate: '',
    image: '',
    introtext: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private songService: SongService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddracePage');
  }

  doAddRace(race: Race) {
    this.songService.addRace(race).then(ref => {
      this.navCtrl.setRoot('HomePage', {key: ref.key});
    });
  }

}
