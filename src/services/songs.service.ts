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

    getRaceList() {
        return this.raceListRef;
    }

    getStageList() {
        return this.stageListRef;
    }

    filterByString(race: string) {
        return this.db.list('/stage-list' , ref => ref.orderByChild('race').equalTo(race)); // https://www.youtube.com/watch?v=uKdqjdzKcQg
    }

    addRace(race: Race) { // paramter song off type Song
        return this.raceListRef.push(race); // Here we tell FireBase to add an item to the songs table
    }

    addStage(stage: Stage) { // paramter song off type Song
        return this.stageListRef.push(stage); // Here we tell FireBase to add an item to the songs table
    }
}
