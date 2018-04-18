import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongService } from './../../services/songs.service';
import { Observable } from 'rxjs/Observable'; // We add this so newly added songs or bands (by other app instances) are shown in this app
import { Song } from '../../models/song.model';
import { Band } from '../../models/band.model';

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

  songsList$: Observable<Song[]>;
  bandsList$: Observable<Band[]>;
  
  band: Band = {
    name: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private songService: SongService) { 
      
      this.songsList$ = this.songService.getSongList().snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  ionViewWillLoad() {
    // Load the bandslist
    this.bandsList$ = this.songService.getBandList().snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  // On filter change
  onContextChange(ctxt: string): void  {
    this.songsList$ = this.songService.assembleBandFilteredList(ctxt).snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }


  doShowAllSongs() {
    this.songsList$ = this.songService.getSongList().snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }
}
