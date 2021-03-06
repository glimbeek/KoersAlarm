import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stage } from '../../models/stage.model';


@IonicPage()
@Component({
  selector: 'page-viewstage',
  templateUrl: 'viewstage.html',
})
export class ViewstagePage {

  stage: Stage = {
    race: '',
    name: '',
    startdate: '',
    startroute: '',
    endroute: '',
    length: '',
    type: '',
    winner: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stage = navParams.get('item');
    console.log(this.stage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewstagePage');
  }

}
