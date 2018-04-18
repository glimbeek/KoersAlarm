import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongService } from './../../services/songs.service';
import { Observable } from 'rxjs/Observable'; // We add this so newly added songs or bands (by other app instances) are shown in this app

import { Stage } from '../../models/stage.model';
import { Race } from '../../models/race.model';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  raceList$: Observable<Race[]>;
  
  race: Race = {
    name: '',
    country: '',
    startdate: '',
    image: '',
    introtext: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private songService: SongService) {}

  ionViewWillLoad() {

    this.raceList$ = this.songService.getRaceList().snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });

  }

}
