import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Song } from '../models/song.model';
import { Band } from '../models/band.model';

@Injectable()
export class SongService {

    private songListRef = this.db.list<Song>('song-list');
    private bandListRef = this.db.list<Band>('band-list');

    constructor(private db: AngularFireDatabase) {}

    getSongList() {
        return this.songListRef;
    }

    filterByString(band: string) {
        return this.db.list('/song-list' , ref => ref.orderByChild('band').equalTo(band)); // https://www.youtube.com/watch?v=uKdqjdzKcQg
    }

    assembleBandFilteredList(ctxt) {
        //use filter by string to return all songs ba particular band
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
