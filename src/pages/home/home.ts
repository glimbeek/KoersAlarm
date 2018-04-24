import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer} from '@ionic-native/email-composer';

// Race and stage stuff
import { SongService } from './../../services/songs.service';
import { Observable } from 'rxjs/Observable'; // We add this so newly added songs or bands (by other app instances) are shown in this app
import { Stage } from '../../models/stage.model';
import { Race } from '../../models/race.model';

// Local Notifications Stuff
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import { renderDateTime } from 'ionic-angular/util/datetime-util';

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
  stageList$: Observable<Stage[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private songService: SongService,
    private emailComposer: EmailComposer,
    public localNotifications: LocalNotifications,) {}

  ionViewWillLoad() {

    this.raceList$ = this.songService.getRaceList().snapshotChanges().map(changes => {
      return changes.map( c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });

    // // Local notifications
    // let notification = {
    //   // id: day.dayCode,
    //   title: 'Hey!',
    //   text: 'You just got notified :)',
    //   // at: firstNotificationTime,
    //   // every: 'week'
    // };
    // console.log("Sending a notification: " , notification)

    this.songService.getStageList().snapshotChanges().subscribe( data =>{
      if (data) {        
        data.map( test =>{
          // Get the date from FireBase
          let datetime = test.payload.child("startdate").val()
          
          // Test compare
          if (datetime === '25-04-2018') {
            
            // console.log('datetime from Json: ', datetime)

            // Get the current date in a moment type so we can compare it
            let momentCurrentDate = moment().format("MM-DD-YYYY")

            // if the FireBase date is the same to the current date
            if (datetime = momentCurrentDate) { 

              this.localNotifications.schedule({
                title: 'Morgen start de ...',
                text: 'Vergeet niet te kijken!'
              })

            } 

          }
        });  		
      }
    });

    this.localNotifications.schedule({
      title: 'Justin Rhyss',
      text: 'Do you want to go see a movie tonight?',
      attachments: ['file://assets/imgs/le-tour-de-france.png'],
    })

  }

  // We need to fix this so we can not only mail, but also use whatsapp/facebook/twitter/etc...
  doSendEmail(string) {
    let email = {
      to: '',
      cc: '',
      attachment: [

      ],
      subject: 'Het onderwerp' + string,
      body: 'Het bericht',
      isHtml: true
    }
    this.emailComposer.open(email)
  }

}
