import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Song } from '../models/song.model';
import { Band } from '../models/band.model';

import { Race } from '../models/race.model';
import { Stage } from '../models/stage.model';

@Injectable()
export class SongService {

    private songListRef = this.db.list<Song>('song-list');
    private bandListRef = this.db.list<Band>('band-list');
    private raceListRef = this.db.list<Race>('race-list');
    private stageListRef = this.db.list<Stage>('stage-list');

    constructor(private db: AngularFireDatabase) {}

    getSongList() {
        return this.songListRef;
    }

    getRaceList() {
        return this.raceListRef;
    }

    getStageList() {
        return this.stageListRef;
    }

    filterByString(band: string) {
        return this.db.list('/song-list' , ref => ref.orderByChild('band').equalTo(band)); // https://www.youtube.com/watch?v=uKdqjdzKcQg
    }

    assembleBandFilteredList(ctxt) {
        //use filter by string to return all songs ba particular band
    }

    addRace(race: Race) { // paramter song off type Song
        return this.raceListRef.push(race); // Here we tell FireBase to add an item to the songs table
    }

    addStage(stage: Stage) { // paramter song off type Song
        return this.stageListRef.push(stage); // Here we tell FireBase to add an item to the songs table
    }

    addSong(song: Song) { // paramter song off type Song
        return this.songListRef.push(song); // Here we tell FireBase to add an item to the songs table
    }

    addBand(band: Band) { // paramter song off type Song
        return this.bandListRef.push(band); // Here we tell FireBase to add an item to the bands table
    }

    getBandList() {
        return this.bandListRef;
    }

    editSong(song: Song) {
        return this.songListRef.update(song.key, song);
    }

    removeSong(song: Song) {
        return this.songListRef.remove(song.key);
    }
}
