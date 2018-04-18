import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SongService } from './../../services/songs.service';
import { Observable } from 'rxjs/Observable'; // We add this so newly added songs or bands (by other app instances) are shown in this app

import { Stage } from '../../models/stage.model';
import { Race } from '../../models/race.model';


@IonicPage()
@Component({
  selector: 'page-viewrace',
  templateUrl: 'viewrace.html',
})
export class ViewracePage {

  raceList$: Observable<Race[]>;
  stageList$: Observable<Stage[]>;

  
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

    this.race = navParams.get('item');

    this.stageList$ = this.songService.filterByString(this.race.name).snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewracePage');
  }

}
