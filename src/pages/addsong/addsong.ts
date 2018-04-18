import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongService } from './../../services/songs.service';
import { Song } from '../../models/song.model';

/**
 * Generated class for the AddsongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addsong',
  templateUrl: 'addsong.html',
})
export class AddsongPage {

  song: Song = {
    title: '',
    chords: '',
    lyrics: '',
    band: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private songService: SongService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsongPage');
  }

  doAddSong(song: Song) {
    this.songService.addSong(song).then(ref => {
      this.navCtrl.setRoot('HomePage', {key: ref.key});
    });
  }

}
