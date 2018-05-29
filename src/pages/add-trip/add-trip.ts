import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FlightInfoPage } from '../flight-info/flight-info';

/**
 * Generated class for the AddTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html',
})
export class AddTripPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTripPage');
  }

  NAVTO_FlightInfo() {
    this.navCtrl.push(FlightInfoPage)
  }

}
